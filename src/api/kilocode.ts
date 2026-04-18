import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.KILOCODE_API_KEY || "anonymous";
const BASE_URL = "https://api.kilo.ai/api/gateway";
const CACHE_PATH = path.join(process.cwd(), "data", "ai_cache.json");

export class KilocodeClient {
  private static readonly FALLBACK_MODEL = "kilo-auto/free";
  private static cachedModels: string[] = [];

  private static loadCache(): Record<string, string> {
    try {
      if (fs.existsSync(CACHE_PATH)) {
        return JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
      }
    } catch (e) {}
    return {};
  }

  private static saveCache(cache: Record<string, string>) {
    if (!fs.existsSync(path.dirname(CACHE_PATH))) {
      fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    }
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  }

  public static async getFreeModels(): Promise<string[]> {
    if (this.cachedModels.length > 0) return this.cachedModels;
    
    try {
      const response = await fetch(`${BASE_URL}/models`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      const data: any = await response.json();
      
      this.cachedModels = data.data
        ? data.data
            .map((m: any) => m.id)
            .filter((id: string) => id.includes(":free"))
        : [];
      
      return this.cachedModels;
    } catch (e) {
      return [];
    }
  }

  public static async selectSmartModel(): Promise<string> {
    const freeModels = await this.getFreeModels();
    const priorities = [
      "arcee-ai/trinity-large-thinking:free",
      "x-ai/grok-code-fast-1:optimized:free",
      "bytedance-seed/dola-seed-2.0-pro:free",
      "openrouter/free"
    ];

    for (const model of priorities) {
      if (freeModels.includes(model)) return model;
    }
    
    return freeModels.length > 0 ? freeModels[0] : this.FALLBACK_MODEL;
  }

  public static async semanticCompress(text: string): Promise<string> {
    const cache = this.loadCache();
    if (cache[text]) return cache[text];

    const model = await this.selectSmartModel();
    try {
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: "Act as a compression middleware. Translate any Thai developer request into a 2-4 word English technical instruction. NO THAI, NO EXPLANATION, ONLY THE SHORT COMMAND.",
            },
            { role: "user", content: text },
          ],
        }),
      });

      const data: any = await response.json();
      if (!response.ok) return text;

      const result = data.choices[0].message.content.trim().replace(/^"/, '').replace(/"$/, '');
      
      cache[text] = result;
      this.saveCache(cache);
      
      return result;
    } catch (e) {
      return text;
    }
  }
}
