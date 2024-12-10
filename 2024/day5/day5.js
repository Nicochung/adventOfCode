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

  let toRules = true;
  const rules = [];
  const updates = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line === "") {
      toRules = false;
      continue;
    }
    if (toRules) {
      rules.push(line);
    } else {
      updates.push(line);
    }
  }
  // console.log(rules.at(-1));
  // console.log(updates);
  // part1(rules, updates);
  part2(rules, updates);
}

processLineByLine();

function part1(rules, updates) {
  // Create rule map
  const map = {};
  const reverseMap = {};
  rules.forEach((str) => {
    const [start, end] = str.split("|").map((x) => +x);
    // console.log([start, end]);
    if (map[start] == null) {
      map[start] = [];
    }
    map[start].push(end);
    if (reverseMap[end] == null) {
      reverseMap[end] = [];
    }
    reverseMap[end].push(start);
  });
  console.log(map);

  const validUpdates = updates
    .filter((update) => {
      const order = update.split(",").map((x) => +x);

      for (let i = 0; i < order.length; ++i) {
        const pageX = order[i];
        // console.log(map[pageX]);
        // Check if all pageY comes after pageX (appears in map[pageX])
        for (let j = i + 1; j < order.length; ++j) {
          const pageY = order[j];
          if (map[pageX]?.includes(pageY) === false) return false;
          if (reverseMap[pageY]?.includes(pageX) === false) return false;
        }
      }
      return true;
    })
    .map((v) => v.split(",").map((x) => +x))
    .map((v) => {
      const middle = Math.floor(v.length / 2);
      return v[middle];
    })
    .reduce((acc, cur) => {
      acc += cur;
      return acc;
    });
  console.log(validUpdates);
}
function part2(rules, updates) {
  // Create rule map
  const map = {};
  const reverseMap = {};
  rules.forEach((str) => {
    const [start, end] = str.split("|").map((x) => +x);
    // console.log([start, end]);
    if (map[start] == null) {
      map[start] = [];
    }
    map[start].push(end);
    if (reverseMap[end] == null) {
      reverseMap[end] = [];
    }
    reverseMap[end].push(start);
  });
  console.log(map);

  const invalidUpdates = updates
    .filter((update) => {
      const order = update.split(",").map((x) => +x);

      for (let i = 0; i < order.length; ++i) {
        const pageX = order[i];
        // console.log(map[pageX]);
        // Check if all pageY comes after pageX (appears in map[pageX])
        for (let j = i + 1; j < order.length; ++j) {
          const pageY = order[j];
          if (map[pageX]?.includes(pageY) === false) return true;
          if (reverseMap[pageY]?.includes(pageX) === false) return true;
        }
      }
      return false;
    })
    .map((v) =>
      v
        .split(",")
        .map((x) => +x)
        .sort((a, b) => {
          if (map[a]?.includes(b)) return -1;
          if (reverseMap[a].includes(b)) return 1;
          return 0;
        })
    )
    .map((v) => {
      const middle = Math.floor(v.length / 2);
      return v[middle];
    })
    .reduce((acc, cur) => {
      acc += cur;
      return acc;
    });
  console.log(invalidUpdates);
}
