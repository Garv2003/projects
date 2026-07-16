import mongoose from "mongoose";
import { Schema } from "mongoose";

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

const likeSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
  userId: String,
  commentId: String,
});

const Like = mongoose.model("Like", likeSchema);

export default Like;

// module.exports = Like;
