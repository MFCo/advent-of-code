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
    console.log()
    const [ trash, key, L, R ] = line.match(/^(\w+)\s*=\s*\((\w+),\s*(\w+)\)$/);
    nodes.push({key, R, L});
  }
  let steps = 0;
  let current = nodes.findIndex(e => e.key==='AAA');

  while(nodes[current].key !== 'ZZZ') {
    current = nodes.findIndex(e => e.key === nodes[current][instructions.charAt(steps % instructions.length)]);
    steps++;
  }

  console.log(steps);
});
