const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const lines = data.split("\n");
  const instructions = lines[0];
  const nodes = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) continue;
    console.log();
    const [trash, key, L, R] = line.match(/^(\w+)\s*=\s*\((\w+),\s*(\w+)\)$/);
    nodes.push({ key, R, L });
  }

  let current = nodes.reduce((acc, e, i) => {
    if (e.key.charAt(2) === "A") acc.push({ ...e, index: i });
    return acc;
  }, []);

  let graphCycles = [];

  current.forEach((start) => {
    let cycle = [];
    let steps = 0;
    let potentialEnd = [];
    let currentEnd = start;
    let foundCycle = false;
    while (!foundCycle) {
      while (currentEnd.key[2] !== "Z" || steps === 0) {
        let newEnd = {
          ...nodes.find(
            (e) =>
              e.key ===
              nodes[currentEnd.index][
                instructions.charAt(steps % instructions.length)
              ]
          ),
          index: nodes.findIndex(
            (e) =>
              e.key ===
              nodes[currentEnd.index][
                instructions.charAt(steps % instructions.length)
              ]
          ),
        };
        currentEnd = newEnd;
        steps++;
      }
      cycle.push(steps);
      if (potentialEnd.length === 0 || potentialEnd.findIndex((e) => e === currentEnd.key) < 0) {
        potentialEnd.push(currentEnd.key);
        steps = 0;
      } else if (potentialEnd.findIndex((e) => e === currentEnd.key) > -1)
        foundCycle = true;
    }
    graphCycles.push(cycle);
  });

  const greatestCommonDivisor = (a, b) => {
    if (!b) {
      return a;
    }
    return greatestCommonDivisor(b, a % b);
  };
  console.log(graphCycles);
  let leastCommonDenominator = graphCycles[0][0];
  for (let i = 1; i < graphCycles.length; i++) {
    leastCommonDenominator =
      (leastCommonDenominator * graphCycles[i][0]) /
      greatestCommonDivisor(leastCommonDenominator, graphCycles[i][0]);
  }

  console.log(leastCommonDenominator);
});
