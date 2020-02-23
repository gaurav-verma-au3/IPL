const express = require("express");
const app = express();
const fs = require("fs");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const DB = require("./db");
const uploads = require("./routes/uploads");
const seasons = require("./routes/seasons");
const teams = require("./routes/teams");
const match = require("./routes/match");
const search = require("./routes/search");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

DB(app);

app.use("/uploads/", uploads);
app.use("/", seasons);
app.use("/", teams);
app.use("/", match);
app.use("/", search);

app.listen(process.env.PORT || 3001, () => {
  console.log("App Connected on : 3001");
});
