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

  let input = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    input = line.split(" ");
  }
  // part1(input);
  part2(input);
}

processLineByLine();

function part1(input) {
  for (let i = 0; i < 25; ++i) {
    input = helper(input);
    // console.log(input);
  }
  console.log(input.length);
}

function helper(arr) {
  return arr.flatMap((val) => {
    if (val === "0") return "1";
    if (val.length % 2 === 0) {
      return [
        (+val.substring(0, val.length / 2)).toString(),
        (+val.substring(val.length / 2)).toString(),
      ];
    }
    return (+val * 2024).toString();
  });
}

function part2(input) {
  for (let i = 0; i < 75; ++i) {
    console.log(i);
    input = helper2(input);
  }
  console.log(input.length);
}

const cache = {};

function helper2(arr) {
  return arr.flatMap((val) => {
    if (cache[val] != null) return cache[val];
    if (val === "0") {
      cache[val] = "1";
    } else if (val.length % 2 === 0) {
      cache[val] = [
        (+val.substring(0, val.length / 2)).toString(),
        (+val.substring(val.length / 2)).toString(),
      ];
    } else {
      cache[val] = (+val * 2024).toString();
    }
    return cache[val];
  });
}
