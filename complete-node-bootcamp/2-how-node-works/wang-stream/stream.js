const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
  // solution 1
  fs.readFile(`${__dirname}/../starter/test-file.txt`, (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });

  // solution 2
  // const readable = fs.createReadStream(`${__dirname}/../starter/test-file.txt`);
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });

  // solution 3
  // const readable = fs.createReadStream(`${__dirname}/../starter/test-file.txt`);
  // readable.pipe(res); // 这一句是把readable这样一个可读源通过管道写入res这样的可写目的地
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server run on http://127.0.0.1:3000");
});
