const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/foodDb", { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log(error);
  });
