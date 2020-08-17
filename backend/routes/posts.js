const router = require("express").Router();
const { MongoClient, ObjectID } = require("mongodb");
let Post = require("../models/post.model");

router.route("/").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const bodyText = req.body.bodyText;
  const fecha = req.body.fecha;
  const userID = req.body.userID;
  const userName = req.body.userName;
  const newPost = new Post({
    title,
    bodyText,
    fecha,
    userID,
    userName,
  });
  newPost
    .save()
    .then(() => res.json("Post added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addUp").post((req, res) => {
  Post.findById(req.body.postID)
    .then((post) => {
      post.ups.includes(req.body.userID)
        ? null
        : post.ups.push(req.body.userID);

      post
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deleteUp").post((req, res) => {
  Post.findById(req.body.postID)
    .then((post) => {
      // post.ups.includes(req.body.userID) ? null : post.ups.pop(req.body.userID);
      const index = post.ups.indexOf(req.body.userID);
      if (index > -1) {
        post.ups.splice(index, 1);
      }
      post
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addDown").post((req, res) => {
  Post.findById(req.body.postID)
    .then((post) => {
      post.downs.includes(req.body.userID)
        ? null
        : post.downs.push(req.body.userID);

      post
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/deleteDown").post((req, res) => {
  Post.findById(req.body.postID)
    .then((post) => {
      const index = post.downs.indexOf(req.body.userID);
      if (index > -1) {
        post.downs.splice(index, 1);
      }
      post
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
