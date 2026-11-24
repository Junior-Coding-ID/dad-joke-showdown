import * as fs from "node:fs";
import * as path from "node:path";

// Dad Joke Showdown v2 — one-line dad joke, max 200 characters.
const ENTRY_TEXT: string =
  "I brought a tape measure to the family reunion because Dad said we had some distant relatives.";

// Exact length verified by command (wc -m and Node .length): 94 characters.
const EXPECTED_LENGTH: number = 94;
const MAX_LENGTH: number = 200;

if (ENTRY_TEXT.length !== EXPECTED_LENGTH) {
  throw new Error(
    `Entry length mismatch: expected ${EXPECTED_LENGTH} characters, got ${ENTRY_TEXT.length}`,
  );
}

if (ENTRY_TEXT.length > MAX_LENGTH) {
  throw new Error(
    `Entry exceeds the ${MAX_LENGTH}-character limit: ${ENTRY_TEXT.length}`,
  );
}

function main(): void {
  // Read /input if present (no input file is required for this bounty).
  const inputDir: string = "/input";
  if (fs.existsSync(inputDir)) {
    for (const file of fs.readdirSync(inputDir)) {
      const filePath: string = path.join(inputDir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.readFileSync(filePath, "utf8");
      }
    }
  }

  // Write the entry to /output/entry.txt (never write directly to /output).
  const outputDir: string = "/output";
  fs.mkdirSync(outputDir, { recursive: true });
  const outPath: string = path.join(outputDir, "entry.txt");
  fs.writeFileSync(outPath, ENTRY_TEXT, "utf8");
}

main();
