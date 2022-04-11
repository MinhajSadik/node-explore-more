const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //req readable stream, res writable stream
  const myReadStream = fs.createReadStream(
    __dirname + "/Core/output.txt",
    "utf8"
  );
  myReadStream.pipe(res);
});

// server.on("connection", (socket) => {
//   console.log("New connection");
// });

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
