const fs = require("fs");

fs.readFile("input.txt", "utf8", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  const calculateWins = (time, distance) => {
    let wins = 0;
    for (let i = 1; i <= time; i++) {
      if ((time - i) * i > distance) wins++;
    }
    return wins;
  };
  const lines = data.split("\n");

  const timeArray = lines[0]
    .replace("Time:", "")
    .trim()
    .split(/\s+/)
    .map(Number);

  const distanceArray = lines[1]
    .replace("Distance:", "")
    .trim()
    .split(/\s+/)
    .map(Number);

  const singleTime = parseInt(lines[0].match(/\d+/g).join(""));
  const singleDistance = parseInt(lines[1].match(/\d+/g).join(""));

  const result = timeArray.reduce((acc, e, index) => {
    let win = calculateWins(e, distanceArray[index]);
    return win > 0 ? acc * win : acc;
  }, 1);

  console.log("PART 1", result);
  console.log("PART 2", calculateWins(singleTime, singleDistance));
});
