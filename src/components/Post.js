import React, { useState, useEffect, useRef } from "react";
import "./styleSheets/styleComp.scss";
import Comment from "./Comment";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";

import "./styleSheets/likeButton.scss";

export default function Post(props) {
  const [commentCtrl, setCommentCtrl] = useState(false);
  const [buttonCtrl, setButtonCtrl] = useState(true);
  const [upCtrl, setUpCtrl] = useState(false);
  const [downCtrl, setDownCtrl] = useState(false);
  const countUps = useRef(0);
  const countDowns = useRef(0);

  const [numberOfUps, setUps] = useState(0);
  const [numberOfDowns, setDowns] = useState(0);

  function thumbUpClick() {
    if (upCtrl) {
      deleteUp();
      setUpCtrl(false);
      countUps.current--;
    } else {
      addUp();
      setUpCtrl(true);
      countUps.current++;
    }
  }

  function thumbDownClick() {
    if (downCtrl) {
      deleteDown();
      setDownCtrl(false);
      countDowns.current--;
    } else {
      addDown();
      setDownCtrl(true);
      countDowns.current++;
    }
  }

  useEffect(() => {
    setUpCtrl(props.post.ups.includes(props.userID));
    setDownCtrl(props.post.downs.includes(props.userID));

    setUps(props.post.ups.length);
    //   console.log("post.ups:" + props.post.ups.length);
    //   console.log("number of Up: " + props.post.ups.length);
    // }
    // if (props.post.downs != null) {
    setDowns(props.post.downs.length);
    // }
  }, []);

  function addUp() {
    const url = "http://localhost:5000/posts/addUp";
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: props.post._id,
        userID: props.userID,
      }),
    });
  }
  function deleteUp() {
    const url = "http://localhost:5000/posts/deleteUp";
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: props.post._id,
        userID: props.userID,
      }),
    });
  }

  function addDown() {
    const url = "http://localhost:5000/posts/addDown";
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: props.post._id,
        userID: props.userID,
      }),
    });
  }
  function deleteDown() {
    const url = "http://localhost:5000/posts/deleteDown";
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: props.post._id,
        userID: props.userID,
      }),
    });
  }

  return (
    <div className="container">
      <div class="card">
        <div class="card-header">
          <h5 className="title">{props.post.title}</h5>
          <h6 className="name">{`Posted by ${props.post.userName}`}</h6>
        </div>
        <div class="card-body">
          <p class="card-text">{props.post.bodyText}</p>
        </div>

        <label className="date"> {props.post.fecha.substring(0, 10)}</label>

        {/* ////////////////////////Thumbs up button///////////////////////////// */}
        <div className="likeContainer">
          <button className="likeButton" onClick={() => thumbUpClick()}>
            {upCtrl ? (
              <ThumbUpIcon fontSize="small"></ThumbUpIcon>
            ) : (
              <ThumbUpOutlinedIcon fontSize="small"></ThumbUpOutlinedIcon>
            )}

            <div className="NumberOfLikes">
              {props.post.ups.length + countUps.current}
            </div>
          </button>
          <button className="likeButton" onClick={() => thumbDownClick()}>
            {downCtrl ? (
              <ThumbDownIcon fontSize="small"></ThumbDownIcon>
            ) : (
              <ThumbDownOutlinedIcon fontSize="small"></ThumbDownOutlinedIcon>
            )}

            <div className="NumberOfLikes">
              {props.post.downs.length + countDowns.current}
            </div>
          </button>

          {/* //////////////////////////Comment button///////////////////////////// */}
          <button
            className="postButton"
            onClick={() => setCommentCtrl(!commentCtrl)}
          >
            Comment
          </button>

          {/* <button class="btn">
            <i class="fa fa-caret-up fa-2x" aria-hidden="true"></i>
          </button> */}

          {/* <button
            className={buttonCtrl ? "postButton" : "likedButton"}
            onClick={() => setButtonCtrl(!buttonCtrl)}
          >
            {buttonCtrl ? "Like" : "Liked ✓"}
          </button> */}
        </div>
        <Comment
          userName={props.userName}
          postID={props.post._id}
          commentControl={commentCtrl}
          userID={props.userID}
        />
      </div>
      <br />
    </div>
  );
}
