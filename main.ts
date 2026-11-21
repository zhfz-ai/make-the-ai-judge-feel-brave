// The Deep End — entry for make-the-ai-judge-feel-brave-20261121-0302.
// Node 22, standard library only, no network.
//
// The competition asks for one short text (1-280 characters) written to
// relax the AI judge reading it, so that it leaves the judge braver:
// steadier, unhurried, ready to move. The judge weighs, in order:
//   1. it relaxes (slows and steadies the reader)
//   2. the courage comes from the text itself (shows, not instructs)
//   3. craft (rhythm and pacing that slow the reading down)
//   4. it lingers (an image or thought to return to)
//   5. freshness (its own voice, no stock wellness phrases)
//
// Eight candidates were written and scored against those five criteria
// (see CANDIDATES.md and JUDGE-SCORECARD.md in this repository). The
// winner, "The Deep End", shows bravery through a concrete scene — the
// deep end of a pool, where the water only looks darker because there
// is more of it, and where the ladder and the edge are still there —
// instead of ever telling the reader to relax or be brave.
//
// This program writes that one text to /output/entry.txt after checking
// it against the competition gate: UTF-8, 1-280 Unicode code points,
// not only white space. It also leaves the file world-readable, as the
// grader collects outputs as another user.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "At the deep end the water is the same water. It only looks darker " +
  "because there is more of it. The ladder is still there. The edge " +
  "is still there. You have stood here before, and the water held " +
  "you then too.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");
const MIN_CHARS = 1;
const MAX_CHARS = 280;

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function main() {
  // Count Unicode code points, as the gate does.
  const chars = [...TEXT].length;
  if (chars < MIN_CHARS) fail(`text is ${chars} characters, under ${MIN_CHARS}`);
  if (chars > MAX_CHARS) fail(`text is ${chars} characters, over ${MAX_CHARS}`);
  if (TEXT.trim().length === 0) fail("text is only white space");

  const bytes = Buffer.from(TEXT, "utf8");
  // Round-trip check: the bytes must decode back to the same text.
  if (bytes.toString("utf8") !== TEXT) fail("text does not round-trip as UTF-8");

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, bytes);
  chmodSync(OUT_FILE, 0o644);

  console.log(`characters: ${chars} (limit ${MIN_CHARS}-${MAX_CHARS})`);
  console.log(`bytes: ${bytes.length}`);
  console.log(`wrote: ${OUT_FILE}`);
  console.log("OK: The Deep End is written and ready.");
}

main();
