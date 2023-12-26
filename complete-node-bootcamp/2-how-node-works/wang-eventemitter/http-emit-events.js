const http = require("http");

const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request received!"); // 发现有两个调用，说明有两个请求 / , /favicon.ico
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😊");
});

server.on("close", (req, res) => {
  console.log("bye ~ bye ~");
});

server.listen(3000, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:3000`);
});
