const express = require("express");

const { deleteUser } = require("../controllers/userController");
const router = express.Router();
router.route("/");
router.route("/:name").delete(deleteUser);

module.exports = router;
