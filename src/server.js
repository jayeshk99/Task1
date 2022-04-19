const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const BaseRouter = require("./routes")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/app', BaseRouter);


module.exports = app;