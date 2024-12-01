const fs = require("fs");

const loadMatrixFromFile = (filename) => {
  const content = fs.readFileSync(filename, "utf8");
  const rows = content.trim().split("\n");
  return rows.map((row) => row.trim());
};

const getNumbersAround = (matrix, i, j) => {
  const numbersAround = [];
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
      matrix[lookUpRow][lookUpCol].match(/^\d$/)
    ) {
      let tempNum = {
        value: matrix[lookUpRow][lookUpCol].toString(),
        start: lookUpCol,
        end: lookUpCol,
        row: lookUpRow,
      };
      let k = lookUpCol + 1;
      while (
        k >= 0 &&
        k < matrix[lookUpRow].length &&
        matrix[lookUpRow][k].match(/^\d$/)
      ) {
        tempNum.value = tempNum.value + matrix[lookUpRow][k].toString();
        tempNum.end = k;
        k++;
      }
      k = lookUpCol - 1;
      while (
        k >= 0 &&
        k < matrix[lookUpRow].length &&
        matrix[lookUpRow][k].match(/^\d$/)
      ) {
        tempNum.value = matrix[lookUpRow][k].toString() + tempNum.value;
        tempNum.start = k;
        k--;
      }
      if (
        !numbersAround.some(
          (e) =>
            e.value === tempNum.value &&
            e.start === tempNum.start &&
            e.end === tempNum.end &&
            e.row === tempNum.row
        )
      )
        numbersAround.push(tempNum);
    }
  }
  return numbersAround;
};

const gearRatio = (matrix) => {
  let gearRatio = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "*") {
        const numbersAround = getNumbersAround(matrix, i, j);
        if (numbersAround.length > 1)
          gearRatio += numbersAround.reduce(
            (acc, e) => acc * parseInt(e.value),
            1
          );
      }
    }
  }
  return gearRatio;
};

const matrix = loadMatrixFromFile("input.txt");
console.log(gearRatio(matrix));
