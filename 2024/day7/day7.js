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

  const equations = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    equations.push(line);
  }
  // console.log(rules.at(-1));
  // console.log(updates);
  // part1(equations);
  part2(equations);
  // part2(map);
}

processLineByLine();

function part1(equations) {
  // console.log(equations);
  let total = 0;
  equations.forEach((v) => {
    const arr = v.split(":");
    const sum = +arr[0];
    const splitNums = arr[1]
      .substring(1)
      .split(" ")
      .map((v) => +v);
    // console.log(sum, splitNums);
    if (backtrackHelper(splitNums, 1, splitNums[0], sum)) total += sum;
  });
  console.log("totla", total);
}

// Backtracking
function backtrackHelper(arr, curIdx, acc, target) {
  if (curIdx === arr.length) {
    return acc === target;
  }
  if (curIdx > arr.length) return false;

  // + operation
  const plus = backtrackHelper(arr, curIdx + 1, acc + arr[curIdx], target);
  if (plus === true) return true;
  // * operation
  const multi = backtrackHelper(arr, curIdx + 1, acc * arr[curIdx], target);
  return multi;
}

function part2(equations) {
  // console.log(equations);
  let total = 0;
  equations.forEach((v) => {
    const arr = v.split(":");
    const sum = +arr[0];
    const splitNums = arr[1]
      .substring(1)
      .split(" ")
      .map((v) => +v);
    // console.log(sum, splitNums);
    if (backtrackHelper2(splitNums, 1, splitNums[0], sum)) total += sum;
  });
  console.log("totla", total);
}

// Backtracking
function backtrackHelper2(arr, curIdx, acc, target) {
  if (curIdx === arr.length) {
    return acc === target;
  }
  if (curIdx > arr.length) return false;

  // + operation
  const plus = backtrackHelper2(arr, curIdx + 1, acc + arr[curIdx], target);
  if (plus === true) return true;
  // * operation
  const multi = backtrackHelper2(arr, curIdx + 1, acc * arr[curIdx], target);
  if (multi === true) return true;

  // || (concat) operation
  const concat = backtrackHelper2(
    arr,
    curIdx + 1,
    +`${acc}${arr[curIdx]}`,
    target
  );
  return concat;
}
