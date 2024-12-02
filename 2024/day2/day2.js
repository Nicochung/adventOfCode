// https://nodejs.cn/api/readline/example_read_file_stream_line_by_line.html

const fs = require("node:fs");
const readline = require("node:readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let safeCount = 0;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const numberArray = line.split(" ").map((v) => +v);
    if (
      isLevelSafe(numberArray) ||
      numberArray.some((_, idx, arr) => isLevelSafeWithDamper(arr, idx))
    ) {
      safeCount++;
    }
  }
  console.log("Count", safeCount);
}

processLineByLine();

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

function isLevelSafe(arr) {
  if (Array.isArray(arr) === false) return false;
  const len = arr.length;

  if (len <= 1) return true;
  if (arr[0] === arr[1]) return false;

  const increasing = arr[0] < arr[1];

  for (let i = 0; i < len - 1; ++i) {
    const diff = (arr[i + 1] - arr[i]) * (increasing ? 1 : -1);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

// Part2
function isLevelSafeWithDamper(arr, skippedIdx) {
  if (Array.isArray(arr) === false) return false;
  arr = arr.filter((_, idx) => idx !== skippedIdx);

  const len = arr.length;

  if (len <= 1) return true;
  if (arr[0] === arr[1]) return false;

  const increasing = arr[0] < arr[1];
  for (let i = 0; i < len - 1; ++i) {
    const diff = (arr[i + 1] - arr[i]) * (increasing ? 1 : -1);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}
