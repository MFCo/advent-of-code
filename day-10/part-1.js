const fs = require("fs");

const directions = {
  "-": [
    [0, -1],
    [0, 1],
  ],
  "|": [
    [-1, 0],
    [1, 0],
  ],
  L: [
    [-1, 0],
    [0, 1],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  7: [
    [0, -1],
    [1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
  S: [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ],
};

const loopLength = (start, matrix) => {
  let queue = [start];
  let loop = [start];
  while (queue.length) {
    let currentNode = queue.shift();
    for (const [x, y] of directions[
      matrix[currentNode.i][currentNode.j].value
    ]) {
      const lookUpRow = currentNode.i + x;
      const lookUpCol = currentNode.j + y;
      if (
        lookUpRow >= 0 &&
        lookUpRow < matrix.length &&
        lookUpCol >= 0 &&
        lookUpCol < matrix[lookUpRow].length &&
        matrix[lookUpRow][lookUpCol].value !== "." &&
        loop.findIndex((e) => e.i === lookUpRow && e.j === lookUpCol) === -1
      ) {
        loop.push({ i: lookUpRow, j: lookUpCol });
        queue.push({ i: lookUpRow, j: lookUpCol });
      }
    }
  }
  return loop.length;
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const matrix = data.split("\n").map((line) =>
    line
      .trim()
      .split("")
      .map((e) => ({ value: e, distance: -1 }))
  );
  let start = { i: -1, j: -1 };
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].value === "S") {
        start = { i, j };
        break;
      }
    }
    if (start.i > -1) break;
  }

  console.log(loopLength(start, matrix));
});
