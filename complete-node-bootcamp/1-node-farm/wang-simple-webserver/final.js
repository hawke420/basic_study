const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const hostname = '0.0.0.0';
const port = 3000;

const data = fs.readFileSync(`${__dirname}/../starter/dev-data/data.json`, "utf-8");
const json_obj = JSON.parse(data);

// 需要解析json对象中的元素 并替换{% %}占位符
// const replacetemp = (temp, product) => {
//     let output = temp.replace(/{%PRODUCT%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);
//     if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     return output;
// }
// 导入模块方法
const replacetemp = require('./modules/replacetemp');
// const replacetemp = require(`${__dirname}/modules/replacetemp`);

// 获取html内容
const overviewtemp = fs.readFileSync(`${__dirname}/../starter/templates/overview.html`, "utf-8");
const cardtemp = fs.readFileSync(`${__dirname}/../starter/templates/card.html`, "utf-8");
const productemp = fs.readFileSync(`${__dirname}/../starter/templates/product.html`, "utf-8");

const server = http.createServer((req, res) => {
    // url解析
    const {query,pathname} = url.parse(req.url,true);
    // true 将查询字符串转换成对象
    // query: [Object: null prototype] { id: '0' },
    // pathname: '/product',
    // path: '/product?id=0',
    console.log("query:",query," and pathname:",pathname);

    // overview
    if (pathname === "/overview" || pathname === "/") {
        res.writeHead(200,
            {
                'Content-type': 'text/html'
            });
        const cards_html = json_obj.map(el => replacetemp(cardtemp,el)); // 循环执行json对象的每个元素然后对cardtemp进行填充
        overview_html = overviewtemp.replace(/{%PRODUCTS_CARD%}/g, cards_html);
        res.end(overview_html)
    }

    // api
    else if (pathname === "/api") {
        res.writeHead(200,
            {
                'Content-type': 'application/json'
            });
        res.end(data);
    }

    // product
    else if (pathname === "/product") {
        res.writeHead(200,
            {
                'Content-type': 'text/html'
            });
        console.log("query.id = ",query.id);
        // 取出json_obj中id对应的那个目标产品
        aim_product = json_obj[query.id];
        const product_html = replacetemp(productemp,aim_product);
        res.end(product_html);
    }

    // not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>page not found...</h1>")
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});