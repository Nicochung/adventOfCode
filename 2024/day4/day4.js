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

  const array = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    array.push(line);
  }

  searchXmas(array);
  searchXmas2(array);
}

processLineByLine();

const EIGHT_DIR = [
  [1, 1],
  [1, 0],
  [0, 1],
  [-1, -1],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, 1],
];

function willExceedBoundary(i, j, width, height) {
  if (i < 0 || j < 0 || i >= height || j >= width) return true;
  return false;
}

function searchXmas(arr) {
  const m = arr.length;
  const n = arr[0].length;

  let count = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      const char = arr[i].at(j);
      if (char === "X") {
        EIGHT_DIR.forEach(([dx, dy]) => {
          // X (i, j)
          // M (i + dx, j + dy)
          // A (i + 2*dx, j + dy)
          // S (i + 3*dx, j + dy)
          if (willExceedBoundary(i + 3 * dx, j + 3 * dy, m, n)) return;
          if (arr[i + dx].at(j + dy) !== "M") return;
          if (arr[i + 2 * dx].at(j + 2 * dy) !== "A") return;
          if (arr[i + 3 * dx].at(j + 3 * dy) !== "S") return;
          count++;
        });
      }
    }
  }
  console.log(count);
}

const FOUR_DIR = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

function searchXmas2(arr) {
  const m = arr.length;
  const n = arr[0].length;

  let count = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      const char = arr[i].at(j);
      if (
        char === "A" &&
        !FOUR_DIR.some(([dx, dy]) => willExceedBoundary(i + dx, j + dy, m, n))
      ) {
        if (
          // CHECK TL -> BR MAS or SAM
          ((arr[i - 1].at(j - 1) === "M" && arr[i + 1].at(j + 1) === "S") ||
            (arr[i - 1].at(j - 1) === "S" && arr[i + 1].at(j + 1) === "M")) &&
          // CHECK TR -> BL MAS or SAM
          ((arr[i - 1].at(j + 1) === "M" && arr[i + 1].at(j - 1) === "S") ||
            (arr[i - 1].at(j + 1) === "S" && arr[i + 1].at(j - 1) === "M"))
        ) {
          count++;
        }
      }
    }
  }
  console.log(count);
}
