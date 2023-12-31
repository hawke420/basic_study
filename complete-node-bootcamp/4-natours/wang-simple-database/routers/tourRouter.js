const express = require("express");
const fs = require("fs");

const router = express.Router();
const tourFun = require("../controllers/tourController");
router.param("id", tourFun.checkID);
router
    .route("/")
    .get(tourFun.getAllTours)
    .post(tourFun.checkNew, tourFun.createTour);
router.route("/:id").get(tourFun.getTheTour).patch(tourFun.updateTour);

module.exports = router;
