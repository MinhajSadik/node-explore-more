const fs = require("fs");

const ourReadStreem = fs.createReadStream(
  `${__dirname}/Core/output.txt`,
  "utf8"
);
const ourWriteStreem = fs.createWriteStream(`${__dirname}/output.txt`, "utf8");

ourReadStreem.on("data", (chunk) => {
  ourWriteStreem.write(chunk);
});

console.log("hello");
