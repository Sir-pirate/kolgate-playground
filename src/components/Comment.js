import React, { useState, useEffect } from "react";
import "./styleSheets/comment.css";
import "./styleSheets/styleComp.scss";
export default function Comment(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  if (!props.commentControl) {
    return null;
  }

  function fetchComments() {
    const url = "http://localhost:5000/comments/" + props.postID;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch(function () {
        console.log("error");
      });
  }
  function handleAdd(e) {
    e.preventDefault();
    if (props.userID == null) {
      alert("You need to log in first!");
    } else {
      if (newComment.length == 0) {
        alert("comment cannot be empty!");
      }
    }

    if (props.userID != null && newComment.length > 0) {
      fetch("http://localhost:5000/comments/add", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bodyText: newComment,
          userName: props.userName,
          postID: props.postID,
          userID: props.userID,
        }),
      })
        .then((response) => alert("comment added!"))
        .then(() => fetchComments())
        .then(() => setNewComment(null));
    }
  }

  return (
    <div class="detailBox">
      <div class="actionBox">
        {comments.map((comment) => (
          <ul class="commentList">
            <li>
              <div class="commenterImage">
                <img src="http://lorempixel.com/50/50/people/7" />
              </div>
              <div class="commentText">
                <h4 className="userName">{comment.userName}</h4>
                <p class="">{comment.bodyText}</p>{" "}
                <span class="date sub-text">{comment.createdAt}</span>
              </div>
            </li>
          </ul>
        ))}

        <form class="form-inline" role="form">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Your comments"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>

          <div class="form-group">
            <button class="commentButton" onClick={handleAdd}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
