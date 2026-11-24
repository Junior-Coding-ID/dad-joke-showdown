import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "I asked my butcher if I could order sausages online. He said he'd send me a few links.";

if (ENTRY_TEXT.length !== 86) {
  throw new Error(`entry text must be exactly 86 characters, got ${ENTRY_TEXT.length}`);
}

const args = process.argv.slice(2);
let outputDir = "/output";
const flagIndex = args.indexOf("--output");
if (flagIndex !== -1) {
  if (flagIndex + 1 >= args.length) {
    throw new Error("--output requires a directory argument");
  }
  outputDir = args[flagIndex + 1];
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_TEXT, "utf8");
process.exit(0);
