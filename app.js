var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")
var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var adminRouter = require("./routes/admin")
var apiRouter = require("./routes/api")
require("dotenv").config()
var app = express()
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
)

app.use(cors())
app.use(flash())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(
  "/admin",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
)
app.use("/", indexRouter)
app.use("/users", usersRouter)
// admin

app.use("/api/v1/member", apiRouter)

//router

app.use("/admin", adminRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

const mongoose = require("mongoose")

var dbUrl = null
if (process.env.ONLINE == "true") {
  dbUrl = process.env.MONGO_SERVER_ON
} else {
  dbUrl = process.env.MONGO_SERVER_OFF
}

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
  // retry to connect for 60 times
})

mongoose.connection.on("error", (err) => {
  logError(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
