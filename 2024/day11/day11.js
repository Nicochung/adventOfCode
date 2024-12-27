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

const CNT = 75;

function part1(input) {
  for (let i = 0; i < CNT; ++i) {
    input = helper(input);
    // console.log(input);
  }
  console.log("part1", input.length);
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

const cache = {};
function part2(input) {
  let len = 0;
  input.forEach((num) => {
    len += helper2(+num, CNT);
  });
  // console.log("cache", cache);
  console.log("part2", len);
}

function helper2(val, step) {
  // Base Condition
  // Reach the end

  if (step === 0) {
    return 1;
  }

  const key = `${val}|${step}`;
  // if found in cache, return
  if (cache[key] != null) {
    return cache[key];
  }
  // Replace 0 with 1
  if (val === 0) {
    // const len = helper2(1, step - 1);
    cache[key] = helper2(1, step - 1);
    return cache[key];
  }

  // Even number of digit split
  const strVal = val.toString();
  if (strVal.toString().length % 2 === 0) {
    const first = +strVal.substring(0, strVal.length / 2);
    const second = +strVal.substring(strVal.length / 2);

    const firstLen = helper2(first, step - 1);
    const secondLen = helper2(second, step - 1);
    cache[key] = firstLen + secondLen;
    return cache[key];
  }
  cache[key] = helper2(val * 2024, step - 1);
  return cache[key];
}

// function helper2(arr) {
//   return arr.flatMap((val) => {
//     if (cache[val] != null) return cache[val];
//     if (val === "0") {
//       cache[val] = "1";
//     } else if (val.length % 2 === 0) {
//       cache[val] = [
//         (+val.substring(0, val.length / 2)).toString(),
//         (+val.substring(val.length / 2)).toString(),
//       ];
//     } else {
//       cache[val] = (+val * 2024).toString();
//     }
//     return cache[val];
//   });
// }
