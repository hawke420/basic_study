const fs = require("fs");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../update-dev-data/tours-simple.json`)
);

// 为了给路由添加中间件，实现判断id是否合理
exports.checkID = (req, res, next, val) => {
    const tour = tours.find((el) => el.id === 1 * val);
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "invalid request: excessive id.",
        });
    }
    next();
};

// 限制创建新的tour必须指定price和name
exports.checkNew = (req, res, next) => {
    if (!req.body.price || !req.body.name) {
        return res.status(400).json({
            status: "fail",
            message: "invalid request: missing name or price",
        });
    }
    next();
};

// 也可以将所有的方法融合在一个对象中
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        results: tours.length,
        data: { tours },
    });
};

exports.getTheTour = (req, res) => {
    const find_id = req.params.id * 1;
    const tour = tours.find((el) => el.id === find_id);
    /*
    // 用中间件来实现相同的逻辑
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
    */
    res.status(200).json({
        status: "success",
        data: tour,
    });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    const update_id = req.params.id * 1;
    const update_tour = tours.find((el) => el.id === update_id);
    // console.log(req.body);
    /*
    try {
        Object.assign(update_tour, req.body);
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "invalid request: id not exist.",
        });
    }
    */
    Object.assign(update_tour, req.body);
    fs.writeFile(
        `${__dirname}/../update-dev-data/tours-simple.json`,
        JSON.stringify(tours),
        "utf-8",
        (err) => {
            if (err) return console.log("update error: not write");
            else {
                res.status(200).json({
                    status: "update success",
                    update: update_tour,
                });
            }
        }
    );
};
