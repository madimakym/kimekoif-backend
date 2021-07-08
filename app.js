// @ts-nocheck
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var exphbs = require("express-handlebars");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` app listening at http://localhost:${PORT}`);
});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

require("./app/routes/routes.js")(app);
app.use(express.static("public"));
