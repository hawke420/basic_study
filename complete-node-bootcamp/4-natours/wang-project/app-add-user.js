const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

// 服务器的配置
const hostname = "120.79.43.97";
const port = 3000;

// 使用中间件
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 读取资源
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);

// 设置请求的操作
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
    try {
        Object.assign(update_tour, req.body);
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "invalid request: id not exist.",
        });
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
                    update: update_tour,
                });
            }
        }
    );
};

const deleteUser = (req, res) => {
    console.log(req.params.name);
    const delname = req.params.name;
    res.status(200).json({
        status: "success",
        message: `delete user:${delname}`,
    });
};

// 设置路由
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTheTour).patch(updateTour);
app.route("/api/v1/users");
app.route("/api/v1/users/:name").delete(deleteUser);

// 开始一个服务器
app.listen(port, () => {
    console.log(`App running on port http://${hostname}:${port}`);
});
