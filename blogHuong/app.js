var createError = require("http-errors");
var express = require("express");
const {sequelize} = require('./databases/database');
var path = require("path");

// For facebook login
var cookieParser = require("cookie-parser");
var session = require('express-session');
var logger = require("morgan");
const passport = require('passport');
const bodyParser = require('body-parser');
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const homeRouter = require("./routes/home");
const detailsRouter = require("./routes/details");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Session
app.set("trust proxy", 1);
const SequelizeStore = require("connect-session-sequelize")(session.Store);

var myStore = new SequelizeStore({
  db: sequelize
})

app.use(
  session({
    secret: "keyboard cute cat",
    store: myStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    proxy: true
  })
);
// myStore.sync(); //If you want SequelizeStore to create/sync the database table

// End of Session

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());


// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// passport-fb middleware
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/", homeRouter);
app.use("/details", detailsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
