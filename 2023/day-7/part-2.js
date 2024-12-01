const fs = require("fs");

const values = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

const determineValue = (cards) => {
  const count = {};
  for (let i = 0; i < cards.length; i++) {
    const value = cards[i];
    count[value] = count[value] + 1 || 1;
  }
  let jvalue = 0;
  if(count["J"] !== undefined) {
    jvalue = count["J"];
    delete count["J"];
  }
  const occurrences = Object.values(count).sort().reverse();
  if (occurrences.length > 0) occurrences[0] = occurrences [0] + jvalue;
  else occurrences.push(jvalue);

  switch (occurrences[0]) {
    case 5:
      return 6;
    case 4:
      return 5;
    case 3:
      if (occurrences.includes(2)) {
        return 4;
      } else {
        return 3;
      }
    case 2: {
      if (occurrences.includes(3)) {
        return 4;
      } else if (occurrences.includes(2, 1)) {
        return 2;
      } else {
        return 1;
      }
    }
    default:
      return 0;
  }
};

const compareHands = (a, b) => {
  const difference = a.value - b.value;
  if (difference != 0) return difference;
  for (let i = 0; i < 5; i++) {
    if (values.indexOf(a.cards[i]) > values.indexOf(b.cards[i])) return 1;
    else if (values.indexOf(a.cards[i]) < values.indexOf(b.cards[i])) return -1;
  }
  return 0;
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");
  const handArray = [];

  lines.forEach((line) => {
    const [cards, bid] = line.trim().split(" ");
    handArray.push({ cards, bid: parseInt(bid), value: determineValue(cards) });
  });

  handArray.sort(compareHands);
  console.dir(handArray.map(e => `(${e.cards}, ${e.bid})`), {'maxArrayLength': null});
  console.log(handArray.reduce((acc, e, i) => acc + e.bid * (i + 1), 0));
});
