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
      temp.push(line[i]);
    }
    map.push(temp);
  }
  // console.log(map);

  const antennas = {};
  const m = map.length;
  const n = map[0].length;

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      const char = map[i][j];
      if (char === ".") continue;
      if (antennas[char] == null) {
        antennas[char] = [];
      }
      antennas[char].push([i, j]);
    }
  }

  // console.log(antennas);
  // part1(antennas, m, n);
  part2(antennas, m, n);
}

processLineByLine();

function exceedBoundary(i, j, m, n) {
  if (i < 0 || i >= m || j < 0 || j >= n) return true;
  return false;
}

function part1(antennas, m, n) {
  const set = new Set();
  Object.values(antennas).forEach((coordinates) => {
    const len = coordinates.length;
    for (let i = 0; i < len; ++i) {
      const [x1, y1] = coordinates[i];
      for (let j = i + 1; j < len; ++j) {
        const [x2, y2] = coordinates[j];
        const dx = x1 - x2;
        const dy = y1 - y2;

        // dx > 0, x1 on right,
        // antinode x are x1+dx, x2-dx
        // dx < 0, x1 on left,
        // antinode x are x1+dx, x2-dx

        // dy > 0, y1 on bottom,
        // antinode y are y1+dy, y2-dy
        // dy < 0, y1 on top,
        // antinode x are y1+dy, y2-dy

        // antinode x are x1 + dx, x2 - dx
        // antinode y are y1 + dy, y2 - dy

        // Node 1
        if (exceedBoundary(x1 + dx, y1 + dy, m, n) === false) {
          set.add(`${x1 + dx}|${y1 + dy}`);
        }

        // Node 2
        if (exceedBoundary(x2 - dx, y2 - dy, m, n) === false) {
          set.add(`${x2 - dx}|${y2 - dy}`);
        }
      }
    }
  });
  console.log(set.size);
}
function part2(antennas, m, n) {
  const set = new Set();
  Object.values(antennas).forEach((coordinates) => {
    const len = coordinates.length;
    for (let i = 0; i < len; ++i) {
      const [x1, y1] = coordinates[i];
      for (let j = i + 1; j < len; ++j) {
        const [x2, y2] = coordinates[j];

        const dx = x1 - x2;
        const dy = y1 - y2;
        // antinode x are x1 + dx, x2 - dx
        // antinode y are y1 + dy, y2 - dy

        let cnt = 0;
        // Node 1
        while (exceedBoundary(x1 + dx * cnt, y1 + dy * cnt, m, n) === false) {
          set.add(`${x1 + dx * cnt}|${y1 + dy * cnt}`);
          cnt++;
        }
        cnt = 0;
        // Node 2

        while (exceedBoundary(x2 - dx * cnt, y2 - dy * cnt, m, n) === false) {
          set.add(`${x2 - dx * cnt}|${y2 - dy * cnt}`);
          cnt++;
        }
      }
    }
  });
  console.log(set.size);
}
