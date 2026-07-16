import mongoose from "mongoose";
const { Schema } = mongoose;

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Like",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;

// module.exports = User;
