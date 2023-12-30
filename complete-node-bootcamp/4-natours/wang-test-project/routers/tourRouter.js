const express = require("express");
const fs = require("fs");

/*
const tours = JSON.parse(
fs.readFileSync(`${__dirname}/../../starter/dev-data/data/tours-simple.json`)
);

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
        `${__dirname}/../update-dev-data/tours-simple.json`,
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
        `${__dirname}/../update-dev-data/tours-simple.json`,
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
*/
const router = express.Router();
const tourFun = require("../controllers/tourController");
router.param("id", tourFun.checkID); // 对所有存在id的路由使用了这个中间件，实现重复的逻辑
// 也可以不全部导入 const {getAllTours , ...} = require("<PATH>");
router
    .route("/")
    .get(tourFun.getAllTours)
    .post(tourFun.checkNew, tourFun.createTour);
router.route("/:id").get(tourFun.getTheTour).patch(tourFun.updateTour);

module.exports = router;
