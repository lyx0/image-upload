const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

// Helpers
const methodOverride = require("method-override");

// Routes
const uploadRoutes = require("./routes/upload");

// MongoDB
mongoose.connect("mongodb://localhost:27017/image-test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection refused:"));
db.once("open", () => {
    console.log("Connected to database");
});

const app = express();

// For EJS templates
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

// So that the basepath is always the file with
// app.js in it, regardless of where we call it
app.set("views", path.join(__dirname, "views"));

// Enables us to read the request body from the
// POST request
app.use(express.urlencoded({ extended: true }));

// Enables us to use more than GET and POST in
// a html request.
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
    res.render("index");
});
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
