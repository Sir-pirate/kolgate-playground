const router = require("express").Router();
let Comment = require("../models/comment.model");

router.route("/add").post((req, res) => {
  const bodyText = req.body.bodyText;
  const userName = req.body.userName;
  const postID = req.body.postID;
  const userID = req.body.userID;
  const newComment = new Comment({
    bodyText,
    userName,
    postID,
    userID,
  });
  newComment
    .save()
    .then(() => res.json("Comment added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Comment.find({ postID: req.params.id })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
