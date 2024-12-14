// https://nodejs.cn/api/readline/example_read_file_stream_line_by_line.html

const fs = require("node:fs");
const readline = require("node:readline");

async function processLineByLine() {
  // const fileStream = fs.createReadStream("input.txt");
  const fileStream = fs.createReadStream("sample.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let toRules = true;

  const map = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const size = line.length;
    const temp = [];
    for (let i = 0; i < size; ++i) {
      temp.push(line[i]);
    }
    map.push(temp);
  }
  // console.log(rules.at(-1));
  // console.log(updates);
  // part1(map);
  part2(map);
}

processLineByLine();

function exceedBoundary(i, j, m, n) {
  if (i < 0 || i >= m || j < 0 || j >= n) return true;
  return false;
}

function getGuardStartPos(map) {
  const m = map.length;
  const n = map[0].length;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (map[i][j] === "^") return [i, j];
    }
  }
  return null;
}

// Up -> Right -> Down -> Left -> Up
const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function part1(map) {
  const m = map.length;
  const n = map[0].length;
  const visited = new Array(m).fill(0).map((_) => new Array(n).fill(0));

  let dirIndex = 0;

  // Search for ^ starting position
  let [i, j] = getGuardStartPos(map);
  while (true) {
    // Mark the current point as visited
    visited[i][j] = 1;
    const nextI = i + dirs[dirIndex][0];
    const nextJ = j + dirs[dirIndex][1];
    if (exceedBoundary(nextI, nextJ, m, n)) break;
    if (map[nextI][nextJ] === "#") {
      dirIndex = (dirIndex + 1) % 4;
    } else {
      i = nextI;
      j = nextJ;
    }
  }
  // console.log(visited);
  // console.log(i, j);
  let count = 0;
  visited.forEach((i) => {
    i.forEach((v) => {
      if (v === 1) count++;
    });
  });
  console.log(count);
}

function part2(map) {
  // TODO
}
