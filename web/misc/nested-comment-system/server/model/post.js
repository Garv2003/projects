import mongoose from "mongoose";
const { Schema } = mongoose;

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  body: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
// module.exports = Post;
