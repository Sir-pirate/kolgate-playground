const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    bodyText: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    userName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    postID: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    userID: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
