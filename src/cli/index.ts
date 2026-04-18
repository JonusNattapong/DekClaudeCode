import { ThaiOptimizer } from "../core/optimizer";

const args = process.argv.slice(2);

async function run() {
  if (args[0] === "add" && args[1] && args[2]) {
    const result = ThaiOptimizer.addMapping(args[1], args[2]);
    console.log(result);
    return;
  }

  if (args[0] === "smart" && args[1]) {
    const original = args[1];
    const optimized = await ThaiOptimizer.smartOptimize(original);
    const stats = ThaiOptimizer.estimateSavings(original, optimized);
    console.log(`\nOriginal:  "${original}"`);
    console.log(`Smart Opt: "${optimized}"`);
    console.log(`Savings:   ${stats.savedPercent}`);
    return;
  }

  // Default Demo
  console.log("\x1b[35m%s\x1b[0m", "=== 🚀 Thai Token Optimizer (Professional) ===");
  const testCases = [
    "ช่วยเขียน unit test ให้หน่อย นะครับพี่ชายยยย",
    "ช่วยเขียนหน้า Login โดยใช้ React และ Tailwind ให้หน่อยครับ เอาแบบสวยๆ เลยนะ",
  ];

  for (const input of testCases) {
    const optimized = await ThaiOptimizer.smartOptimize(input);
    const stats = ThaiOptimizer.estimateSavings(input, optimized);
    console.log(`\x1b[36mInput:\x1b[0m  "${input}"`);
    console.log(`\x1b[33mResult:\x1b[0m "${optimized}"`);
    console.log(`\x1b[32mSaved:\x1b[0m  ${stats.savedPercent}\n`);
  }
}

run().catch(console.error);
