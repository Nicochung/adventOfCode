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

function exceedBoundary(i, j, m, n) {
  if (i < 0 || i >= m || j < 0 || j >= n) return true;
  return false;
}

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

// function part2(disk) {
//   let start = 0;
//   let end = disk.length - 1;
//   while (start < end) {
//     if (disk[start] == null) {
//       // Find size of space
//       let temp = start + 1;
//       while (disk[temp] == null) {
//         temp++;
//       }
//       const spaceSize = temp - start;

//       console.log({ spaceSize, temp });
//       const fileId = disk[end];
//       let temp2 = end - 1;
//       while (disk[temp2] == fileId) {
//         temp2--;
//       }
//       const fileIdSize = end - temp2;
//       console.log({ fileIdSize, fileId });

//       if (fileIdSize <= spaceSize) {
//         // swap
//       } else {
//         // the current fileIdSize doesn't fit, find the next fileId that fit
//         while (fileIdSize > spaceSize) {
//           while (disk[temp2] == fileId || disk[temp2] == null) {
//             // TODO
//             return;
//           }
//           // Find the next fileId that will fit
//         }
//       }
//       // Find size of fileId from end

//       // // Perform swap
//       // // const temp = disk[start];
//       // // find the pos from end where disk[end] !==null
//       // while (start <= end && disk[end] == null) {
//       //   end--;
//       // }

//       // disk[start] = disk[end];
//       // disk[end] = null;
//       start++;
//       end--;
//     } else {
//       start++;
//     }
//   }
//   let id = 0;
//   for (let i = 0; disk[i] != null; ++i) {
//     id += disk[i] * i;
//   }
//   console.log(id);
// }
