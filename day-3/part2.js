const fs = require("fs");

const loadMatrixFromFile = (filename) => {
  const content = fs.readFileSync(filename, "utf8");
  const rows = content.trim().split("\n");
  return rows.map((row) => row.trim());
};

const findStars = (matrix) => {
  const gearRatio = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === '*') {
      }
    }
  }
  return gearRatio;
};

const matrix = loadMatrixFromFile("input.txt");
console.log(
  findNumbersPart1(matrix).reduce((sum, value) => sum + parseInt(value), 0)
);
