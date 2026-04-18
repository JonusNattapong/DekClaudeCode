# Skills: Thai Token Optimization Expert

This document contains specialized instructions on how to maintain and expand the Thai Token Optimization system. Follow these protocols to ensure maximum efficiency and consistency.

## Skill 1: Pattern Recognition & Optimization Trigger

You should proactively suggest or create a new mapping when you detect the following patterns:

- A Thai phrase longer than 15 characters is used 3+ times in a single session.
- A phrase contains complex Thai characters (vowels/tones) that significantly bloat the token count.
- The phrase is a generic development instruction (e.g., asking for documentation, security audits, or specific UI changes).

## Skill 2: Standard Symbol Naming Convention

When creating a new symbol (token), follow this hierarchy to keep it short and intuitive:

1. **Core Action (2-3 letters)**: `[UT]` (Unit Test), `[FIX]` (Fix), `[ADD]` (Add).
2. **Context Modifiers**: `[UT-UI]` (UI Unit Test), `[FIX-BUG]` (Specific bug fix).
3. **Boolean/Question**: `[BUG?]` (Is there a bug?), `[EXPL?]` (How does this work?).

**Rule**: Symbols must always be wrapped in square brackets `[]` and should not exceed 10 characters to maintain token efficiency.

## Skill 3: Autonomous Mapping Execution

To expand the system, follow this exact sequence:

1. **Analyze**: Identify the repetitive phrase.
2. **Propose**: Suggest the symbol to the user (optional if already in "Self-Expansion" mode).
3. **Execute**: Run the addition command:

   ```bash
   npx tsx src/index.ts add "ข้อความภาษาไทย" "[SYMBOL]"
   ```

4. **Update Context**: Ensure the `CLAUDE_OPTIMIZED.md` or `CLAUDE.md` is updated so you can recognize the new symbol immediately in the next turn.

## Skill 4: Token Savings Audit

After creating a mapping, verify the effectiveness:

- Use the `npx tsx src/index.ts` (Demo mode) to check the "Savings Percentage".
- If a mapping saves less than 20%, it might not be worth the added cognitive load unless it is used very frequently.

## Skill 5: Thai Normalization Integrity

When processing Thai text, always perform a "Normalization Check":

- Ensure no triple vowels or misaligned tone marks remain.
- If you see `[CMT-TH]`, ensure your comments use proper Thai grammar but are condensed for token efficiency.

---

Follow these skills to become an elite assistant for Thai developers.
