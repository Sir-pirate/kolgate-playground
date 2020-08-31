import React, { useState, useEffect, Component } from "react";
import "./styleSheets/styleComp.scss";
import Post from "./Post";
import PostModal from "./PostModal";
import "bootstrap/dist/css/bootstrap.min.css";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import app from "./base";

//Sample keys
const LOCAL_STORAGE_KEY1 = "userUID123456789";
const LOCAL_STORAGE_KEY2 = "userEmail123456789";
const LOCAL_STORAGE_KEY3 = "userPassword123456789";

// durian.us.auth0.com
// dOBZYqztqH6XKbmvlYoAl4LzBc2Ki2El
export function Home() {
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [isLogIn, setisLogIn] = React.useState(false);

  const [UID, setUID] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState("");

  useEffect(() => {
    //use local storage to store user data to stay logged-in
    const UID = localStorage.getItem(LOCAL_STORAGE_KEY1);
    const email = localStorage.getItem(LOCAL_STORAGE_KEY2);
    const password = localStorage.getItem(LOCAL_STORAGE_KEY3);
    setUID(UID);
    setEmail(email);
    setPassword(password);
    if (UID) {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (result) {});
      const idUrl = "http://localhost:5000/users/" + UID;
      fetchUserInfo(idUrl); //fetch user info from mongoDB after user successfully log-in
      setisLogIn(true);
    }
    fetchPosts();
  }, []);

  function addPost(post) {
    setPosts([post, ...posts]);
  }

  function fetchPosts() {
    fetch("http://localhost:5000/posts/") ///fetch posts
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }
  function fetchUserInfo(idUrl) {
    fetch(idUrl)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }

  const callbackFunction = (newPost) => {
    //handle newly added post
    //add post to collection
    setModalShow(false);
    if (newPost !== undefined) {
      if (newPost.title != "" && newPost.bodyText != "") {
        addPost(newPost);
        var d = new Date();
        var n = d.toISOString();
        fetch("http://localhost:5000/posts/add", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newPost.title,
            bodyText: newPost.bodyText,
            fecha: n,
            userID: newPost.userID,
            userName: newPost.userName,
            ups: [],
            downs: [],
          }),
        }).then(() => fetchPosts());//fetch posts again after user posted a new one
      }
    }
  };

  function checkIsLogin() {
    if (isLogIn) {
      setModalShow(true);
    } else {
      alert("You need to log in first");
    }
  }

  return (
    <div>
      <div className="buttonContainer">
        <div className="center">
          <Fab aria-label="Add" onClick={() => checkIsLogin()}>
            <AddIcon />
          </Fab>
        </div>
      </div>
      //PostModal component is for user to create new post
      //pass user data for making new post
      <PostModal
        userID={user.UID}
        userName={user.userName}
        show={modalShow}
        onHide={callbackFunction}
      />

      <div className="HomePosts">
        {posts
          .sort(function (a, b) {
            return new Date(b.fecha) - new Date(a.fecha);
          })
          .map((post) => (
            //Post component displays individual posts
            //pass user info into each post for comment sections
            <Post
              userName={user.userName}
              post={post}
              userID={user.UID}
              userName={user.userName}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
