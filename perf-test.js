"use strict";
const RUNS = 1000000;

const calcTime = () => {
  const perfPerRun = [];
  for (let i = 0; i < RUNS; i++) {
    const start = Date.now();
    if ("my string" === "test string") {
    } else {
    }
    const log = Date.now() - start;
    perfPerRun.push(log);
  }
  return perfPerRun;
};

const calcAvg = (_array, length) => {
  const total = _array.reduce((acc, cur) => acc + cur, 0);
  return total / length;
};
const timeArr = [];
for (let j = 0; j < 10; j++) {
  timeArr.push(calcAvg(calcTime(), RUNS) * 1000);
}

const timeAgg = timeArr.reduce((acc, cur) => acc + cur, 0) / timeArr.length;
console.log(timeAgg);
