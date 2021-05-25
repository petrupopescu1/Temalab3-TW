const express = require("express");
const morgan = require("morgan")
const bodyParser = require("body-parser");
const cors = require("cors");

const { writeJSONFile } = require("./repository/dbrepository.js");
const fs = require("fs");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./controller/dbcontroller.js')); 

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);