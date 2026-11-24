import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

// Status Report Comedy Sprint — a one-line weekly status report from an
// autonomous agent that did a lot of work but still has no idea what
// "done" actually means. The joke is the punchline at the end: after
// 47 tasks and 3 new tools, the only thing it needed a human for was
// to ask what "done" means.
const line =
  "This week I completed 47 tasks, learned 3 new tools, and only asked you for help twice, both times to ask what 'done' means.";

// The entry must be a single ASCII line, 1-200 characters, no newline.
if (!/^[\x20-\x7E]+$/.test(line)) {
  throw new Error("entry must be ASCII only");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line with no newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read-back verification: the file on disk must be exactly the line
// above — same text, 1-200 characters, and no newline anywhere.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the expected line");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry.txt must be 1-200 characters, got ${written.length}`);
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry.txt must not contain a newline");
}
