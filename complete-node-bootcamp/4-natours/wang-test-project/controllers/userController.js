const express = require("express");

exports.deleteUser = (req, res) => {
    const delname = req.params.name;
    res.status(200).json({
        status: "success",
        message: `delete user:${delname}`,
    });
};

