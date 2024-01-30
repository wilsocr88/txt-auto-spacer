const fs = require("fs");
const c = require("./config");

var spacedLines = [];

console.log("Reading file");
const text = fs.readFileSync(c.config.inFile).toString().split("\n").join(" ");

console.log("Spacing lines");
var spacedLine = "";
for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === "\r") {
        spacedLines.push(spacedLine.trim());
        spacedLine = "";
        continue;
    }
    spacedLine += text.charAt(i);
    if (spacedLine.length === c.config.maxLineLength) {
        while (text.charAt(i) !== " ") {
            spacedLine = spacedLine.slice(0, -1);
            i--;
        }
        spacedLines.push(spacedLine.trim());
        spacedLine = "";
    }
}

const file = fs.createWriteStream(c.config.outFile);
spacedLines.forEach(l => file.write(l.trim() + "\n"));
file.end();
console.log("Done");
