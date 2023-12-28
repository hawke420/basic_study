const express = require("express");
const fs = require("fs");
const app = express();
const hostname = "120.79.43.97";
const port = 3000;

// 使用中间件 express.json()
app.use(express.json());

// 读取路线数据
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);

// 1.GET：服务器发送数据给客户端，这个数据是全部的tours的信息
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    // 这应该是一种常见的格式，发送和接收都使用json
    // Jsend - status data
    status: "success",
    results: tours.length,
    data: { tours },
  });
});

// 2.GET：发送tours中的某一个id的信息，根据id获取，这个id是一个变量，使用:来修饰，若使用? 比如 /:id? 表示这个是可选的
app.get("/api/v1/tours/:id", (req, res) => {
  // console.log(req.params);  // {id : <endpoint>} 但是后面这个显示成了字符串 如果要转换成数字，可以 * 1 自动转换
  const find_id = req.params.id * 1;

  // const max_id = tours.length;
  // if (find_id > max_id) { // 这里的逻辑可以被后面的!tour替代，id超出范围那肯定是找不到需要的元素(而找不到元素，也不一定就是超出了范围)
  //   res.status(404).json({
  //     status: "fail",
  //     message: "invalid request: excessive id.",
  //   });
  // } else {
  //   const tour = tours.find((el) => el.id === find_id);
  //   res.status(200).json({
  //     status: "success",
  //     results: 1,
  //     // data: tours[req.params.id]
  //     data: tour,
  //   });
  // }

  const tour = tours.find((el) => el.id === find_id);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "invalid request: excessive id.",
    });
  } else {
    res.status(200).json({
      status: "success",
      // data: tours[req.params.id]
      data: tour,
    });
  }
});

// 3.POST：客户端发送请求，同时告诉服务器有需要写入的数据
app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);

  // 创建这个请求发送的数据
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  console.log(newTour);
  tours.push(newTour);

  // 将更新后的tours重新写入文件，记住事件循环中绝对不可以同步
  // 这里tours是一个js对象，需要转换成字符的形式
  fs.writeFile(
    `${__dirname}/update-dev-data/tours-simple.json`,
    JSON.stringify(tours),
    "utf-8",
    (err) => {
      if (err) return console.log("create error: not write");
      // 返回状态码 201 表示已经创建
      res.status(201).json({
        status: "create success",
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send("Done."); // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 因为前面已经发送了响应，所以这个send必须注释掉
});

// 4.PATCH：客户端要求服务器更新数据，对客户端的限制是最好发送给服务器的请求体是需要更新的部分属性（不然整体选择使用PUT）
app.patch("/api/v1/tours/:id", (req, res) => {
  const update_id = req.params.id * 1;
  const update_tour = tours.find((el) => el.id === update_id);
  console.log(req.body);
  Object.assign(update_tour, req.body); // 将需要更新的属性覆盖到原来的对象上
  fs.writeFile(
    `${__dirname}/update-dev-data/tours-simple.json`,
    JSON.stringify(tours),
    "utf-8",
    (err) => {
      if (err) return console.log("update error: not write");

      if (!update_tour) {
        res.status(404).json({
          status: "fail",
          message: "invalid request: excessive id.",
        });
      } else {
        res.status(200).json({
          status: "update success",
          update: update_tour, // 因为update_tour是一个对象，所以其实这里tours中的数据也被更新了
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port http://${hostname}:${port}`);
}); // 用来启动一个服务器

