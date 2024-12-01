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
  let steps = 0;
  let current = nodes.reduce((acc, e, i) => {
    if (e.key.charAt(2) === "A") acc.push(i);
    return acc;
  }, []);
  console.log(instructions);
  console.log(nodes);
  console.log(current);
  while (
    !current.reduce((acc, e) => acc && nodes[e].key.charAt(2) === "Z", true)
  ) {
    current = current.map((element) => {
      return nodes.findIndex(
        (e) =>
          e.key ===
          nodes[element][instructions.charAt(steps % instructions.length)]
      );
    });
    console.log(steps);
    steps++;
  }

  console.log(steps);
});
