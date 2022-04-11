const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<html><head><title>Form</title></head>");
    res.write(
      `<body><form method='post' action="/process"><input name='message' /></form></body></html>`
    );
    res.end();
  } else if (req.url === "/process" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      console.log("stream finished");
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      res.write("Thanks For Submitting");
      res.end();
    });
  } else {
    res.write("Not Found");
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New connection");
// });

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
