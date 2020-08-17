const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var today = new Date();
const PostSchema = new Schema(
  {
    title: { type: String, required: false },
    bodyText: { type: String, required: false },
    fecha: { type: String, required: false },
    userName: { type: String, required: false, unique: false, trim: true },
    userID: { type: String, required: false, unique: false, trim: true },
    ups: { type: Array, required: false, unique: false, trim: true },
    downs: { type: Array, required: false, unique: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", PostSchema);
module.exports = Post;
