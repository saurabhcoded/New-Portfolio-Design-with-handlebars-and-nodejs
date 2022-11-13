require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");
const app = express();
const morgan = require("morgan");
const path = require("path");
const route = require("./routes");
const PORT = process.env.PORT || 3000;

// middlewars
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("short"));

// static
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", {
  layout: path.join("layout", "main"),
});
hbs.registerPartials(path.join(__dirname, "views", "partials"));

//views
app.use("/", route);

//start server
async function startServer() {
  await require("./model/db");
  await route.loadData();
  app.listen(PORT, () => {
    console.log("Server running on link http://localhost:" + PORT);
  });
}

startServer();
