const mongoose = require("mongoose");

const db = mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster.cirkd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("Connection to DB successfull");
  })
  .catch((err) => {
    console.log("error CONNECTION TO DB", err);
  });

module.exports = db;
