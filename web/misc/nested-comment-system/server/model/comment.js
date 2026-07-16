import mongoose from "mongoose";
import { Schema } from "mongoose";

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

const commentSchema = new Schema({
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  userId: String,
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  postId: String,
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
  child: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  parentId: String,
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Like",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

// module.exports = Comment;
