const fs = require("fs");

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const determineValue = (cards) => {
  const countOccurrences = (hand) => {
    const count = {};
    for (let i = 0; i < hand.length; i++) {
      const value = hand[i];
      count[value] = count[value] + 1 || 1;
    }
    return count;
  };
  const occurrences = Object.values(countOccurrences(cards)).sort().reverse();

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
  console.log(handArray.reduce((acc, e, i) => acc + e.bid * (i + 1), 0));
});
