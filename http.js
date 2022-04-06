const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello Programmers");
    res.end();
  }
  if (req.url === "/name/sharminhaj") {
    res.write(JSON.stringify("sharminhaj are coupled from the friendship"));
    res.end();
  } else {
    res.write("Programmers didn't find your sharminhaj coupled");
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New connection");
// });

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
