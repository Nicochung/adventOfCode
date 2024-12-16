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

  let map = "";
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    map = line;
  }

  let space = false;
  let id = 0;
  let len = map.length;
  const disk = [];
  for (let i = 0; i < len; ++i) {
    const value = +map.charAt(i);
    for (let j = 0; j < value; ++j) {
      disk.push(space ? null : id);
    }

    if (space === false) {
      id++;
    }
    space = !space;
  }

  // console.log(disk);

  // console.log(antennas);
  // part1([...disk]);
  part2([...disk]);
  // part2(antennas, m, n);
}

processLineByLine();

function part1(disk) {
  let start = 0;
  let end = disk.length - 1;
  while (start < end) {
    if (disk[start] == null) {
      // Perform swap
      // const temp = disk[start];
      // find the pos from end where disk[end] !==null
      while (start <= end && disk[end] == null) {
        end--;
      }

      disk[start] = disk[end];
      disk[end] = null;
      start++;
      end--;
    } else {
      start++;
    }
  }
  let id = 0;
  for (let i = 0; disk[i] != null; ++i) {
    id += disk[i] * i;
  }
  console.log(id);
}

function findSizeOfFileId(disk, target) {
  const firstIndex = disk.findIndex((v) => v === target);
  if (firstIndex === -1) return [0, -1, -1];
  const lastIndex = disk.findLastIndex((v) => v === target);
  return [lastIndex - firstIndex + 1, firstIndex, lastIndex];
}

function findNContinuousSpace(disk, n, startPos, endPos) {
  let currentSpace = 0;
  for (let i = startPos; i < endPos; ++i) {
    if (currentSpace === n) return [i - n, i];
    if (disk[i] == null) {
      currentSpace += 1;
    } else {
      currentSpace = 0;
    }
  }
  return null;
}

function part2(disk) {
  let start = 0;
  let end = disk.length - 1;
  let fileId = disk[end];

  while (fileId > 0) {
    // Find the size of the current fileId
    const [size, firstIndex, lastIndex] = findSizeOfFileId(disk, fileId);
    // disk[end-size+1] --> disk[end] are fileId
    // Find space from start where it can fit size
    const space = findNContinuousSpace(disk, size, 0, end);
    // console.log({ fileId, size, space, start, end });
    if (space == null || size === 0) {
      // Not enough space to fit the current fileId
      end = firstIndex - 1;
    } else {
      // Enough space
      const [startIdx, endIdx] = space;
      // Copy value to space
      for (let i = startIdx; i < endIdx; ++i) {
        disk[i] = fileId;
      }
      // Mark original place null
      for (let i = firstIndex; i <= lastIndex; ++i) {
        disk[i] = null;
      }
      start = endIdx;
      end = firstIndex - 1;
    }
    fileId--;
    // console.log(disk.map((v) => (v == null ? "." : v)).join(""));
  }
  let id = 0;
  for (let i = 0; i < disk.length; ++i) {
    if (disk[i] == null) continue;
    id += disk[i] * i;
  }
  console.log(id);
}
