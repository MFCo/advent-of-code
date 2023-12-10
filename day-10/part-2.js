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

const loopInMatrix = (start, matrix) => {
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
        matrix[lookUpRow][lookUpCol].inside = false;
        queue.push({ i: lookUpRow, j: lookUpCol });
      }
    }
  }
  return loop;
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
      .map((e) => ({ value: e, inside: true }))
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

  const loop = loopInMatrix(start, matrix);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (loop.findIndex((e) => e.i === i && e.j === j) === -1) {
        matrix[i][j].value = ".";
      }
    }
  }

  matrix[start.i][start.j].value = "L"; //manually calculated from the example to close the loop (should find a way to calculate it in the code)

  let insideCount = 0;

  for (let i = 0; i < matrix.length; i++) {
    let inside = false;
    let corner = null;
    for (let j = 0; j < matrix[i].length; j++) {
      //si paso por una barra paso por una puerta y cambio de donde estoy
      if (matrix[i][j].value === "|") {
        corner = null;
        inside = !inside;
      }
      //este codito no me da mucha data, pero tengo que saber que pasé para que si paso por una J signigica que salí
      if (matrix[i][j].value === "F") {
        corner = "F";
      }
      //este codito no me da mucha data, pero tengo que saber que pasé para que si paso por un 7 signigica que salí
      if (matrix[i][j].value === "L") {
        corner = "L";
      }
      //si paso por un 7 y antes pase por una L entonces es como salir o entrar
      if (matrix[i][j].value === "7") {
        if (corner === "L") {
          inside = !inside;
        }
        corner = null;
      }
      //si paso por una J y antes pase por una F entonces es como salir o entrar
      if (matrix[i][j].value === "J") {
        if (corner === "F") {
          inside = !inside;
        }
        corner = null;
      }
      if (
        inside &&
        matrix[i][j].value === "."
      ) {
        insideCount++;
      }
    }
  }
  console.log(insideCount);
});
