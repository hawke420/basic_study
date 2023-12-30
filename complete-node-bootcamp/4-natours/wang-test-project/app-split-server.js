const hostname = "120.79.43.97";
const port = 3000;

const app = require("./app-split-route.js");

app.listen(port, () => {
  console.log(`App running on port http://${hostname}:${port}`);
}); // 用来启动一个服务器
