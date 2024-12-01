const fs = require("fs");

const checkColumns = (matrix) => {
  let result = [];
  for (let j = 0; j < matrix[0].length; j++) {
    let empty = true;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][j] !== ".") {
        empty = false;
        break;
      }
    }
    if (empty) result.push(j);
  }
  return result;
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const matrix = data.split("\n").map((line) => line.trim().split(""));

  const emptyRows = matrix.reduce((acc, e, i) => {
    if (e.every((v) => v === ".")) acc.push(i);
    return acc;
  }, []);
  const emptyColumns = checkColumns(matrix);

  const galaxies = matrix.reduce((acc, e, i) => {
    const indexes = e.reduce((acc, v, index) => {
      if (v === "#") acc.push(index);
      return acc;
    }, []);
    if (indexes.length > 0)
      indexes.forEach((index) => acc.push({ i, j: index }));
    return acc;
  }, []);

  let result = 0;

  galaxies.forEach((galaxyA, index) => {
    galaxies.slice(index + 1).forEach((galaxyB, i, arr) => {
      for (
        let a = Math.min(galaxyA.i, galaxyB.i);
        a < Math.max(galaxyA.i, galaxyB.i);
        a++
      ) {
        result++;
        if (emptyRows.findIndex((e) => e === a) > -1) result += 1000000 - 1; // change for 1 for part 1
      }
      for (
        let b = Math.min(galaxyA.j, galaxyB.j);
        b < Math.max(galaxyA.j, galaxyB.j);
        b++
      ) {
        result++;
        if (emptyColumns.findIndex((e) => e === b) > -1) result += 1000000 - 1; // change for 1 for part 1
      }
    });
  });

  console.log(result);
});
