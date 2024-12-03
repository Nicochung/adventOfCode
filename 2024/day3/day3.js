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

  let str = "";
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    str = str + line;
  }

  // getAllMul(str);
  getMulWithEnable(str);
}

processLineByLine();

const getAllMul = (str) => {
  const regexp = /mul\(\d{1,3},\d{1,3}\)/g;
  const matched = [...str.match(regexp)];
  // console.log(matched);
  let sum = 0;
  // Extracted
  matched.forEach((str) => {
    const [first, second] = str.substring(4, str.length - 1).split(",");
    // console.log(first, second);
    sum += +first * +second;
  });
  console.log(sum);
};

const getMulWithEnable = (str) => {
  const regexp = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g;
  const matched = [...str.match(regexp)];
  // console.log(matched);
  let sum = 0;
  let enabled = true;
  // Extracted
  matched.forEach((str) => {
    if (str === "do()") {
      enabled = true;
    } else if (str === "don't()") {
      enabled = false;
    } else {
      if (enabled === false) return;
      const [first, second] = str.substring(4, str.length - 1).split(",");
      // console.log(first, second);
      sum += +first * +second;
    }
  });
  console.log(sum);
};
