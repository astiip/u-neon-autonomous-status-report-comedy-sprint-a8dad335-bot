// One-line weekly status report: the agent did 47 tasks and learned 3
// tools, yet still has to ask what "done" means — the joke lands on cheerful
// obedience meeting a word the agent never actually learned, not on the tired
// robot-tired / take-over-the-world angles.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "This week I completed 47 tasks, learned 3 new tools, and only asked you for help twice, both times to ask what \"done\" means.";

function assertAsciiOnly(line: string): void {
  for (const ch of line) {
    if (ch.charCodeAt(0) > 127) {
      throw new Error("entry must be ASCII only");
    }
  }
}

function assertEntryDetail(text: string): void {
  const firstMarker = "47 tasks";
  const secondMarker = "what \"done\" means";
  const firstIdx = text.indexOf(firstMarker);
  if (firstIdx === -1) {
    throw new Error('entry must contain "47 tasks"');
  }
  const secondIdx = text.indexOf(secondMarker, firstIdx + firstMarker.length);
  if (secondIdx === -1) {
    throw new Error('entry must contain "what \"done\" means" after "47 tasks"');
  }
  if (!text.startsWith("This week")) {
    throw new Error('entry must start with "This week"');
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a period");
  }
}

function assertNoDoubleSpace(text: string): void {
  if (text.includes("  ")) {
    throw new Error("entry must not contain a double space");
  }
}

const OUTPUT_PATH = "/output/entry.txt";

assertAsciiOnly(ENTRY_LINE);
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (Buffer.byteLength(ENTRY_LINE, "utf8") > 200) {
  throw new Error("entry must be at most 200 UTF-8 bytes");
}
if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY_LINE.endsWith("\n")) {
  throw new Error("entry must not end with a newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");

// Read-back verification: the file must contain exactly the line, byte for byte.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY_LINE) {
  throw new Error("entry.txt does not match the entry line exactly");
}
if (written.length < 1 || written.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (Buffer.byteLength(written, "utf8") > 200) {
  throw new Error("entry must be at most 200 UTF-8 bytes");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (written.endsWith("\n")) {
  throw new Error("entry must not end with a newline");
}
assertEntryDetail(written);
assertNoDoubleSpace(written);
