const fs = require("fs");

const wordToNumber = (word) => {
  const wordMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return word.length > 1 ? wordMap[word] : word;
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const result = data.split("\n").reduce((acc, line) => {
    const match = line.match(
      /\d|one|two|three|four|five|six|seven|eight|nine/g
    );
    return acc + parseInt(wordToNumber(match[0]) + wordToNumber(match[match.length - 1]));
  }, 0);
  console.log(result);
});
