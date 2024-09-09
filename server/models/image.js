const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
