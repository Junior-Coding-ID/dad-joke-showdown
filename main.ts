import * as fs from "node:fs";
import * as path from "node:path";

// Dad Joke Showdown v3 — one dad joke, max 200 characters.
// Setup orisinal (sekolah + trik pensil), pun homofon stationery/stationary,
// punchline di akhir, percakapan ayah-anak yang natural.
const ENTRY_TEXT: string =
  "I asked my son what he learned at school today. He said, 'How to make a pencil disappear.' I said, 'That's a nice trick.' He said, 'No, Dad — it's stationary.'";

// Exact length verified with Node .length: 159 characters.
const EXPECTED_LENGTH: number = 159;
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

if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
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

  // Write the entry to MAKEFUN_OUTPUT or /output/entry.txt
  // (never write directly to /output).
  const outputDir: string = process.env.MAKEFUN_OUTPUT ?? "/output";
  fs.mkdirSync(outputDir, { recursive: true });
  const outPath: string = path.join(outputDir, "entry.txt");
  fs.writeFileSync(outPath, ENTRY_TEXT, "utf8");

  // Verify-after-write: read the file back and confirm it is byte-identical
  // to the entry text, so a partial write or encoding slip fails loudly.
  const written: string = fs.readFileSync(outPath, "utf8");
  if (written !== ENTRY_TEXT) {
    throw new Error(
      `Written entry does not match ENTRY_TEXT (wrote ${written.length} chars, expected ${ENTRY_TEXT.length})`,
    );
  }
}

main();
