const fs = require("fs");

const calculateFirstNumber = (numbers) => {
  if (numbers.every((num) => num === 0)) return 0;
  let differences = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    differences.push(numbers[i + 1] - numbers[i]);
  }
  return numbers[0] - calculateFirstNumber(differences);
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  console.log(
    data
      .split("\n")
      .reduce(
        (acc, line) =>
          acc + calculateFirstNumber(line.trim().split(" ").map(Number)),
        0
      )
  );
});
