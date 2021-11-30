"use strict";

// @ts-nocheck
require("dotenv").config();

var express = require("express");

var mongoose = require("mongoose");

var session = require("express-session");

var exphbs = require("express-handlebars");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json()); // Session

app.use(session({
  secret: "Set this to a random string that is kept secure",
  resave: true,
  saveUninitialized: true
})); // Connect to MongoDB

var URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100
}, function (err) {
  if (err) throw err;
  console.log("Connected to MongoDB");
});
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  console.log(" app listening at http://localhost:".concat(PORT));
});
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.get('/', function (req, res) {
  res.render('portfolio');
});

require("./app/routes/routes.js")(app);

app.use(express["static"]("public"));