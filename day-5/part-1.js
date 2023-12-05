const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.trim().split("\n");
  const seedsLine = lines[0];
  lines.shift();
  const seeds = seedsLine
    .substring(seedsLine.indexOf(":") + 1)
    .trim()
    .split(" ")
    .map(Number);

  const result = [];
  let subgroup = [];
  for (const line of lines) {
    if (line.match(/^\D+$/)) {
      if (subgroup.length > 0) {
        result.push(subgroup);
        subgroup = [];
      }
    } else {
      const numbers = line.trim().split(" ").map(Number);
      if (numbers.length === 3 && !numbers.some(isNaN)) {
        subgroup.push(numbers);
      }
    }
  }

  if (subgroup.length > 0) {
    result.push(subgroup);
  }

  const convert = (array, input) => {
    for (let j = 0; j < array.length; j++) {
      if (array[j][1] <= input && array[j][1] + array[j][2] > input) {
        return array[j][0] - array[j][1] + input;
      }
    }
    return input;
  };

  console.log(
    Math.min(
      ...seeds.map((seed, i) => {
        let decoded = seed;
        for (let j = 0; j < result.length; j++) {
          decoded = convert(result[j], decoded);
        }
        return decoded;
      })
    )
  );
});
