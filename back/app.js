const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const blogRouter = require("./routes/BlogRoutes");
const userRouter = require("./routes/UserRoutes");
const indexRouter = require ("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/", indexRouter);
app.use("/api/blogs", blogRouter);
app.use("/user", userRouter);

app.use("/uploads", express.static(__dirname + "/uploads"));

const {connect} = require("./db/db");
connect();

module.exports = app;