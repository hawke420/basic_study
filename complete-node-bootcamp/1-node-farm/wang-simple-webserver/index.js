const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '0.0.0.0';
const port = 3000;

const data = fs.readFileSync(`${__dirname}/../starter/dev-data/data.json`,"utf-8");
const json_obj = JSON.parse(data);

const server = http.createServer((req, res) => { 
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // console.log(req.url);
    const pathName=req.url;
    if(pathName==="/overview"||pathName==="/"){
        res.end("overview")
    }
    else if(pathName==="/api"){
        /*
        // API，在请求的时候被发送给客户端使用，这里采用的是简单的json对象解析成js文件给客户端使用
        fs.readFile(`${__dirname}/../starter/dev-data/data.json`,"utf-8",(err,data)=>{
            const json_obj = JSON.parse(data);
            console.log(json_obj);
            res.writeHead(200,
                {
                    'Content-type':'application/json'
                });
            res.end(data);
        }) // 注意区分__dirname 和 . 路径之间的区别 前者是当前文件的位置 .是执行的主页面的位置
        */
        res.writeHead(200,
            {
                'Content-type':'application/json'
            });
       res.end(data);
    }
    else if(pathName==="/product"){
        res.end("product");
    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end("<h1>page not found...</h1>")
    }
}); 

server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
});


// Route 路由意味着针对不同的url实现不同的动作
// 如果是每次都是请求的时候才读取json文件的话，这样其实是不好的。最好的处理办法是一开始就加载出来，不同的路由可以随时调用这个变量。


