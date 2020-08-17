const express = require("express");
const cors = require("cors");
const { Mongoose } = require("mongoose");
let Post = require("./models/post.model");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  console.log(process.env.PORT);
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const userComment = require("./routes/userComments");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/userComments", userComment);
app.put("/update", async (request, response) => {
  Post.updateOne(
    { title: "I like German girls" },
    { $set: { title: "new Title" } }
  );
});

app.listen(port, () => {
  console.log(`Server s running on port: ${port}`);
});
