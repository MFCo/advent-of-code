const fs = require("fs");

const loadMatrixFromFile = (filename) => {
  const content = fs.readFileSync(filename, "utf8");
  const rows = content.trim().split("\n");
  return rows.map((row) => row.trim());
};

const hasAdjacentSymbol = (matrix, i, j) => {
  const direcciones = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [x, y] of direcciones) {
    const lookUpRow = i + x;
    const lookUpCol = j + y;

    if (
      lookUpRow >= 0 &&
      lookUpRow < matrix.length &&
      lookUpCol >= 0 &&
      lookUpCol < matrix[lookUpRow].length &&
      matrix[lookUpRow][lookUpCol].match(/[^a-zA-Z0-9\s.]/)
    ) {
      return true;
    }
  }
  return false;
};

const findNumbers = (matrix) => {
  let currentNumber = {
    value: "",
    hasAdjacent: false,
  };
  const numbers = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].match(/^\d$/)) {
        currentNumber.value =
          currentNumber.value.toString() + matrix[i][j].toString();
        console.log(currentNumber);
        console.log(hasAdjacentSymbol(matrix, i, j));
        if (!currentNumber.hasAdjacent) currentNumber.hasAdjacent = hasAdjacentSymbol(matrix, i,j)
      } else {
        if (currentNumber.hasAdjacent) {
          numbers.push(currentNumber.value);
        }
        currentNumber = { row: -1, start: -1, end: -1, value: "", hasAdjacent: false };
      }
    }
    if (currentNumber.hasAdjacent) {
      numbers.push(currentNumber.value);
    }
    currentNumber = { row: -1, start: -1, end: -1, value: "", hasAdjacent: false };
  }

  return numbers;
};

const matrix = loadMatrixFromFile("input.txt");
console.log(
  findNumbers(matrix).reduce((sum, value) => sum + parseInt(value), 0)
);
