// MadeBy model: developer info for /made-by page
const mongoose = require('mongoose');

const madeBySchema = new mongoose.Schema(
  {
    developerName: { type: String, required: true },
    githubURL: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MadeBy', madeBySchema);