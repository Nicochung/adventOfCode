const { data } = require("./data");

const list1 = [];
const list2 = [];

// Part 1;

data.forEach(([l, r]) => {
  list1.push(l);
  list2.push(r);
});

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let ans = 0;
list1.forEach((v, idx) => {
  ans += Math.abs(v - list2[idx]);
});

console.log(ans);

// Part 2

const appearance = new Map();
list2.forEach((v) => {
  if (appearance.has(v)) {
    const count = appearance.get(v);
    appearance.set(v, count + 1);
  } else {
    appearance.set(v, 1);
  }
});

let score = 0;
list1.forEach((v) => {
  if (appearance.has(v)) {
    const count = appearance.get(v);
    score += count * v;
  }
});
console.log(score);
