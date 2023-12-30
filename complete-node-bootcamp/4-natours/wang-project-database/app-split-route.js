const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

// 导入自定义路由"方法"
const tourRouter = require("./routers/tourRouter");
const userRouter = require("./routers/userRouter");

// 服务器的配置
const hostname = "120.79.43.97";
const port = 3000;

console.log(app.get("env"));
console.log(process.env.NODE_ENV); // 由于先require这个app模块，配置还没有导入。所以要保证配置先加载。

// 使用中间件
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
// 这个设置静态资源的操作相当于把public这个文件夹设置成了网页资源访问的root目录，然后你要访问资源的时候就<app>/<资源名>
app.use(express.static(`${__dirname}/update-dev-data/public`));

// 定义子路由的入口，实际上tourRouter和userRouter也是两个中间件
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
