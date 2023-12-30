const hostname = '120.79.43.97';
const port = process.env.PORT || 3000;

// const app = require("./app-split-route"); // 先定义可能在app中会出现undefined错误

// 将当前的Node绑定到配置文件中
const dotenv = require('dotenv');
const app = require('./app-split-route');

dotenv.config({ path: './config.env' });

/*
// express查看当前环境
console.log(app.get("env"));
// 查看进程可以使用的环境变量
console.log(process.env);
*/

app.listen(port, () => {
    console.log(`App running on port http://${hostname}:${port}`);
});
