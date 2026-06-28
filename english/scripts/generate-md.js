const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "..", "data", "vocabulary.json");
const mdPath = path.join(__dirname, "..", "vocabulary.md");

const words = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

let md = `# 📚 English Vocabulary

> Auto-generated file. Do not edit manually.

---

| Image | Word | Pronunciation | Meaning | Example Sentences | My Sentence | Related Words |
| :---: | :--- | :---: | :--- | :--- | :--- | :--- |
`;

for (const item of words) {
  const image = `<img src="./images/${item.image}" width="120"/>`;

  const sentences = item.sentences.map((s) => `• ${s}`).join("<br><br>");

  const related = item.related.join(", ");

  md += `| ${image} | **${item.word}** | ${item.pronunciation} | ${item.meaning} | ${sentences} | ${item.mySentence} | ${related} |\n`;
}

md += `

---

## Statistics

| Total Words |
| :---: |
| ${words.length} |
`;

fs.writeFileSync(mdPath, md);

console.log("✅ vocabulary.md generated.");
