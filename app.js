const createError = require("http-errors");
const express = require("express");
const engine = require("ejs-blocks");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/users");
//for CRUD
const createRouter = require("./routes/create-route");
const readRouter = require("./routes/read-route");
const updateRouter = require("./routes/update-route");
const deleteRouter = require("./routes/delete-route");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", readRouter);
app.use("/crud", createRouter);
app.use("/crud", updateRouter);
app.use("/crud", deleteRouter);

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
