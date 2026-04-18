#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ThaiOptimizer } from "../core/optimizer";

const server = new Server({
  name: "thai-token-optimizer",
  version: "1.1.0",
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "thai_optimize",
        description: "บีบอัดข้อความไทยให้ประหยัด Token อัตโนมัติ (Mapping + AI)",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "ข้อความไทยที่ต้องการประหยัด",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "add_mapping",
        description: "เพิ่มคำย่อใหม่ลงในระบบ",
        inputSchema: {
          type: "object",
          properties: {
            phrase: { type: "string", description: "ประโยคไทยที่ต้องการเพิ่ม" },
            symbol: { type: "string", description: "สัญลักษณ์ที่จะใช้แทน" },
          },
          required: ["phrase", "symbol"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "thai_optimize") {
    const originalText = String(args?.text || "");
    const optimizedText = await ThaiOptimizer.smartOptimize(originalText);

    return {
      content: [
        {
          type: "text",
          text: optimizedText,
        },
      ],
    };
  }

  if (name === "add_mapping") {
    const phrase = String(args?.phrase);
    const symbol = String(args?.symbol);
    const result = ThaiOptimizer.addMapping(phrase, symbol);

    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Thai Token Optimizer MCP Server running");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
