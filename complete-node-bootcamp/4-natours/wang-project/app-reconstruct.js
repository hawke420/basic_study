const express = require("express");
const morgan = require("morgan");
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

app.use(morgan("dev")); // dev是一个预定义的字符串

// 自定义中间件 -- test
// app.use((req, res, next) => {
//     console.log("execute for all request");
//     next();
// });

// 用一个中间件来返回当前请求的时间戳
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const getAllTours = (req, res) => {
    // console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        results: tours.length,
        data: { tours },
    });
};

const getTheTour = (req, res) => {
    const find_id = req.params.id * 1;
    const tour = tours.find((el) => el.id === find_id);
    if (!tour) {
        res.status(404).json({
            status: "fail",
            message: "invalid request: excessive id.",
        });
    } else {
        res.status(200).json({
            status: "success",
            data: tour,
        });
    }
};

const createTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);
    console.log(newTour);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/update-dev-data/tours-simple.json`,
        JSON.stringify(tours),
        "utf-8",
        (err) => {
            if (err) return console.log("create error: not write");
            res.status(201).json({
                status: "create success",
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

const updateTour = (req, res) => {
    const update_id = req.params.id * 1;
    const update_tour = tours.find((el) => el.id === update_id);
    console.log(req.body);
    // Object.assign(update_tour, req.body); // 将需要更新的属性覆盖到原来的对象上
    try {
        Object.assign(update_tour, req.body);
    } catch (error) {
        return res
            .status(400)
            .json({
                  status:"fail",
                  message: "invalid request: id not exist." });
    }
    fs.writeFile(
        `${__dirname}/update-dev-data/tours-simple.json`,
        JSON.stringify(tours),
        "utf-8",
        (err) => {
            if (err) return console.log("update error: not write");

            if (!update_tour) {
                res.status(404).json({
                    status: "fail",
                    message: "invalid request: id not exist.",
                });
            } else {
                res.status(200).json({
                    status: "update success",
                    update: update_tour, // 因为update_tour是一个对象，所以其实这里tours中的数据也被更新了
                });
            }
        }
    );
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);

// 自定义中间件 -- 2 发现getAllTours被调用的时候没有执行下面这个中间件，因为在这个函数中已经有json来终止
// app.use((res, req, next) => {
// console.log("don't response the front request -- not the front");
// next();
// });

app.route("/api/v1/tours/:id").get(getTheTour).patch(updateTour);

app.listen(port, () => {
    console.log(`App running on port http://${hostname}:${port}`);
}); // 用来启动一个服务器
