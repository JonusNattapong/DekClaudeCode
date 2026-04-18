import fs from "node:fs";
import path from "node:path";
import { KilocodeClient } from "../api/kilocode";

const MAP_PATH = path.join(process.cwd(), "data", "thai_map.json");

export class ThaiOptimizer {
  static loadMap(): Record<string, string> {
    try {
      if (fs.existsSync(MAP_PATH)) {
        return JSON.parse(fs.readFileSync(MAP_PATH, "utf-8"));
      }
    } catch (e) {
      console.error("Error loading map:", e);
    }
    return {};
  }

  private static saveMap(map: Record<string, string>) {
    if (!fs.existsSync(path.dirname(MAP_PATH))) {
      fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
    }
    fs.writeFileSync(MAP_PATH, JSON.stringify(map, null, 2));
  }

  static addMapping(phrase: string, token: string): string {
    const map = this.loadMap();
    map[phrase] = token;
    this.saveMap(map);
    return `✅ Added mapping: "${phrase}" -> ${token}`;
  }

  static normalize(text: string): string {
    return text
      .replace(/[\u0E31\u0E34-\u0E3E\u0E47-\u0E4E]{2,}/g, (m) => m[0])
      .replace(/\s+/g, " ")
      .trim();
  }

  static compress(text: string): string {
    let optimized = this.normalize(text);
    const map = this.loadMap();
    
    for (const [key, value] of Object.entries(map)) {
      optimized = optimized.replace(new RegExp(key, "g"), value);
    }

    return optimized;
  }

  static async smartOptimize(text: string): Promise<string> {
    const mappingResult = this.compress(text);
    
    if (mappingResult.length > 20) {
      return await KilocodeClient.semanticCompress(mappingResult);
    }

    return mappingResult;
  }

  static estimateSavings(original: string, optimized: string) {
    const originalTokens = original.length * 0.8;
    const optimizedTokens = optimized.length * 0.5;
    const percent = ((originalTokens - optimizedTokens) / originalTokens) * 100;
    
    return {
      originalLen: original.length,
      optimizedLen: optimized.length,
      savedPercent: percent.toFixed(2) + "%"
    };
  }
}
