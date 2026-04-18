# Thai Token Optimization Protocol

To save tokens and reduce costs while maintaining high-quality Thai interaction, use the following symbols. I (the user) will send these, and you (Claude) should understand their full meaning.

## Command Mapping

- `[UT]` : Write comprehensive unit tests for the provided code.
- `[EXPL]` : Explain the logic and flow of this code segment.
- `[BUG?]` : Check for potential bugs or logical errors.
- `[FIX]` : Fix the identified bugs or issues.
- `[SUM]` : Provide a concise summary of the current context or task.
- `[REFACT]` : Refactor the code for better readability, performance, and clean code principles.
- `[SEC]` : Audit and enhance security patterns.
- `[TH-REQ]` : Ensure the output or code supports Thai language (UTF-8) properly.

## Tone & Response Rule

- If I use a symbol, please be extremely concise in your response unless I ask for details.
- Thinking in English is encouraged for better logic, but final answers should follow the [TH-REQ] if specified.

## Self-Expansion (Instruction)

If you notice you are using a repetitive Thai phrase that isn't in the mapping, you can ADD it yourself to save future tokens!

Refer to [SKILLS.md](file:///d:/Projects/Github/DekClaudeCode/SKILLS.md) for the expert protocol on how to expand this system.

**To add a new mapping:**
Run: `npx tsx src/index.ts add "ประโยคที่ซ้ำ" "[SYMBOL]"`

Example: `npx tsx src/index.ts add "ช่วยตรวจสอบความปลอดภัย" "[SEC?]"`
