const express = require("express");


const deleteUser = (req, res) => {
    const delname = req.params.name;
    res.status(200).json({
        status: "success",
        message: `delete user:${delname}`,
    });
};


const router = express.Router();
router.route("/");
router.route("/:name").delete(deleteUser);

module.exports = router;

