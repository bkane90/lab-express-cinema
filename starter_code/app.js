require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const Movie = require("./models/Movie")


mongoose
  .connect("mongodb://localhost/starter-code", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })

  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// .then(() => {
//   Movie.create({
//     title: "Shitty Movie with a Twist",
//     director: "M. Night Shamalan",
//   })
// })


const app = express();

app.listen(3000, () => {
  console.log("Webserver running");
});

app.get("/movies", (req, res) => {
  Movie.find({})
    .then((movies) => {
      res.json(movies);
    })
});

app.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.json(movie);
    })
});

app.post("/movies", (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      res.send('New Movie Added!');
    })
});

// Middleware Setup
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
