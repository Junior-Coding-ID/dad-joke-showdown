import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "I told my son never to swim in the river during a storm. He asked why. I said, 'Son, the current situation is shocking.'";

// Gate: one dad joke, 1 to 200 characters, a single line, not whitespace-only.
if (ENTRY_TEXT.length !== 120) {
  throw new Error(`entry must be 120 characters, got ${ENTRY_TEXT.length}`);
}
if (ENTRY_TEXT.length < 1 || ENTRY_TEXT.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY_TEXT.length}`);
}
if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (/[^\x00-\x7F]/.test(ENTRY_TEXT)) {
  throw new Error("entry must be ASCII only");
}
if (ENTRY_TEXT !== ENTRY_TEXT.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_TEXT, "utf8");
  // Verify-after-write: read back and compare byte-for-byte.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY_TEXT) {
    throw new Error("verify-after-write failed: entry.txt does not match ENTRY_TEXT");
  }
  if (back.length !== 120) {
    throw new Error(`verify-after-write failed: entry.txt is ${back.length} chars, expected 120`);
  }
}

main();
