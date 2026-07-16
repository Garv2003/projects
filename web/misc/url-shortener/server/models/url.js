const mongoose=require("mongoose");
const { Schema } = mongoose;

const UrlSchema = new Schema({
  FullUrl: {
    type: String,
    required: true,
  },
  ShortUrl: {
    type: String,
    required: true,
  },
  Clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model("URL", UrlSchema);
