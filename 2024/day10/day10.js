// https://nodejs.cn/api/readline/example_read_file_stream_line_by_line.html

const fs = require("node:fs");
const readline = require("node:readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");
  // const fileStream = fs.createReadStream("sample.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const map = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const size = line.length;
    const temp = [];
    for (let i = 0; i < size; ++i) {
      temp.push(+line[i]);
    }
    map.push(temp);
  }
  // part1(map);
  part2(map);
}

processLineByLine();

function getAll0Pos(map) {
  const pos = [];
  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[0].length; ++j) {
      if (map[i][j] === 0) pos.push([i, j]);
    }
  }
  return pos;
}

// 4 dirs
const DIRS = [
  [0, 1], // RIGHT
  [0, -1], // LEFT
  [1, 0], // DOWN
  [-1, 0], // UP
];

function part1(map) {
  // find all 0 pos
  const zeroPos = getAll0Pos(map);

  let cnt = 0;
  zeroPos.forEach(([i, j]) => {
    // dFS
    const destination = new Set();
    dfs(map, i, j, 0, destination);
    // console.log([i, j], destination);
    cnt += destination.size;
  });
  console.log("cnt", cnt);
}

function dfs(map, i, j, target, destination) {
  const m = map.length;
  const n = map[0].length;
  if (i < 0 || i >= m || j < 0 || j >= n) return;
  if (map[i][j] !== target) return;
  DIRS.forEach(([dx, dy]) => {
    const newI = i + dx;
    const newJ = j + dy;
    if (newI < 0 || newI >= m || newJ < 0 || newJ >= n) return;
    if (target === 8 && map[newI][newJ] === 9) {
      destination.add(`${newI}|${newJ}`);
      return;
    }
    if (map[newI][newJ] !== target + 1) return;
    dfs(map, i + dx, j + dy, target + 1, destination);
  });
}

function part2(map) {
  // find all 0 pos
  const zeroPos = getAll0Pos(map);

  let cnt = 0;
  zeroPos.forEach(([i, j]) => {
    // dFS
    const destination = { cnt: 0 };
    dfs2(map, i, j, 0, destination);
    console.log([i, j], destination.cnt);
    cnt += destination.cnt;
  });
  console.log("cnt", cnt);
}

function dfs2(map, i, j, target, destination) {
  const m = map.length;
  const n = map[0].length;
  if (i < 0 || i >= m || j < 0 || j >= n) return;
  if (map[i][j] !== target) return;
  DIRS.forEach(([dx, dy]) => {
    const newI = i + dx;
    const newJ = j + dy;
    if (newI < 0 || newI >= m || newJ < 0 || newJ >= n) return;
    if (target === 8 && map[newI][newJ] === 9) {
      destination.cnt++;
      return;
    }
    if (map[newI][newJ] !== target + 1) return;
    dfs2(map, i + dx, j + dy, target + 1, destination);
  });
}
