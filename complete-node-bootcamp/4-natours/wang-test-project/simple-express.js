const express = require("express");
const app = express();
const hostname = "120.79.43.97";
const port = 3000;
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from server side.",
        app: "wang-study",
    });
});
app.post("/", (req, res) => {
    res.send("You can post to this endpoint...");
});
app.listen(port, () => {
    console.log(`App running on port http://${hostname}:${port}`);
}); // 用来启动一个服务器
