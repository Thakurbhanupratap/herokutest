const express = require("express");
const path = require("path");
const multer = require("multer");
const ImageModel = require("./models/image.model");

const app = express();
require("./db/conn");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));

//Storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

app.get("/", (req, res) => {
  res.send("hello from bhanu");
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});

app.post("/upload", (req, res) => {
  upload(req, req, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => res.send("successfull uploaded"))
        .catch((err) => console.log(err));
    }
  });
});
