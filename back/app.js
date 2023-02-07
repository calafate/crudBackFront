const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const blogRouter = require("./routes/BlogRoutes");
const indexRouter = require ("./routes/index");


const app = express();

app.use(logger("dev"))
app.use(express.json())
app.use(cors())

app.use("/", indexRouter)
app.use("/api/blogs", blogRouter);

const {connect} = require("./db/db")
connect()

module.exports = app;