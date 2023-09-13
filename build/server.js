"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
require("dotenv").config();
var mongooge = require("mongoose");
var userRoutes = require("./routes/users");
var questionRoutes = require("./routes/questions");
var answerRoutes = require("./routes/answer");
var cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("hello");
});
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
var port = process.env.PORT;
mongooge
    .connect(process.env.DATABASE_URL)
    .then(function () {
    return app.listen(port || 8000, function () {
        console.log("Server Running at Port ".concat(port));
    });
})
    .catch(function (err) { return console.log(err.message); });
