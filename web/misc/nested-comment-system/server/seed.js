const mongoose = require("mongoose");

const User = require("./model/user");
const Post = require("./model/post");
const Comment = require("./model/comment");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/commentsystem");

async function seed() {
  // Clear existing data
  await Promise.all([
    User.deleteMany(),
    Post.deleteMany(),
    Comment.deleteMany(),
  ]);

  // Create users
  const Garv = await User.create({ name: "Garv" });
  const Peter = await User.create({ name: "Peter" });

  // Create posts
  const post1 = await Post.create({
    body: "Lorem ipsum dolor sit amet...",
    title: "Post 1",
  });

  const post2 = await Post.create({
    body: "Proin ut sollicitudin lacus...",
    title: "Post 2",
  });

  // Create comments
  const comment1 = await Comment.create({
    message: "I am a root comment",
    user: Garv._id,
    userId: Garv._id,
    post: post1._id,
    postId: post1._id,
  });

  const comment2 = await Comment.create({
    parentId: comment1._id,
    message: "I am a nested comment",
    user: Peter._id,
    userId: Peter._id,
    post: post1._id,
    postId: post1._id,
  });

  const comment3 = await Comment.create({
    message: "I am another root comment",
    user: Peter._id,
    userId: Peter._id,
    post: post1._id,
    postId: post1._id,
  });

  // Close the MongoDB connection
  mongoose.connection.close();
}

seed();
