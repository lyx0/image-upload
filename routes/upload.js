const express = require("express");
const router = express.Router();

// Cloudinary
const { storage } = require("../cloudinary");

// Multer
const multer = require("multer");
const upload = multer({ storage });

// Upload route
router
    .route("/")
    .get((req, res) => {
        res.render("upload/index");
    })
    .post(upload.array("image"), (req, res) => {
        console.log(req.body);
        console.log(req.file);
        res.send("it worked");
    });

module.exports = router;
