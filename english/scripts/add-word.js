const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.join(__dirname, "..", "data", "vocabulary.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  const word = await ask("Word: ");
  const pronunciation = await ask("Pronunciation: ");
  const meaning = await ask("Meaning: ");
  const image = await ask("Image file (e.g. kitten.jpg): ");

  console.log("\nEnter example sentences.");
  console.log("Press Enter on an empty line to finish.\n");

  const sentences = [];

  while (true) {
    const sentence = await ask(`Sentence ${sentences.length + 1}: `);

    if (!sentence.trim()) break;

    sentences.push(sentence);
  }

  const mySentence = await ask("\nMy sentence: ");

  const relatedInput = await ask("Related words (comma separated): ");

  const related = relatedInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  data.push({
    word,
    pronunciation,
    meaning,
    image,
    sentences,
    mySentence,
    related,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log("\n✅ Word added successfully!");

  rl.close();
})();
