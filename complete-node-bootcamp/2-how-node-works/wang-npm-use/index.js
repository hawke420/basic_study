const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const hostname = '0.0.0.0';
const port = 3000;
const data = fs.readFileSync(
  `${__dirname}/../../1-node-farm/starter/dev-data/data.json`,
  'utf-8'
);

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(req.url);
  // Overview page
  if (pathname === '/') {
    res.setHeader('Content-Type', 'text/plain');
    const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
    console.log(slugs); // 这里只是简单介绍了一下slugify的用法 大写->小写 空格->-
    res.end(`${slugs}`);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
