import app from "./base";
import { Button } from "@material-ui/core";
import React, { useState, useEffect, Component } from "react";
import "./styleSheets/styleComp.scss";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import TabPanel from "./UserInfo";
import "bootstrap/dist/css/bootstrap.min.css";
const LOCAL_STORAGE_KEY1 = "userUID123456789";
const LOCAL_STORAGE_KEY2 = "userEmail123456789";
const LOCAL_STORAGE_KEY3 = "userPassword123456789";

export default function About() {
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
  const [isLogIn, setisLogIn] = React.useState(false);
  const [user, setUser] = React.useState("");
  useEffect(() => {
    const UID = localStorage.getItem(LOCAL_STORAGE_KEY1);
    const email = localStorage.getItem(LOCAL_STORAGE_KEY2);
    const password = localStorage.getItem(LOCAL_STORAGE_KEY3);
    if (UID) {
      setisLogIn(true);
      const idUrl = "http://localhost:5000/users/" + UID;
      fetchUserInfo(idUrl); //fetch user info from mongoDB
      app //authenticate user from google firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (result) {});
    }
  }, []);

  function fetchUserInfo(idUrl) {
    fetch(idUrl)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }

  const callbackFunction3 = (user) => {
    //sign in
    setModalShow3(false);
    if (user !== undefined) {
      app
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(function (result) {
          alert("log in success");
          const user_uid = result.user.uid;
          localStorage.setItem(LOCAL_STORAGE_KEY1, user_uid);
          localStorage.setItem(LOCAL_STORAGE_KEY2, user.email);
          localStorage.setItem(LOCAL_STORAGE_KEY3, user.password);

          const idUrl = "http://localhost:5000/users/" + user_uid;
          fetchUserInfo(idUrl);
          setisLogIn(true);
        })
        .catch(function (error) {
          if (error) {
            alert(error);
          }
        });
    }
  };

  function forwardNewUser(email, userName, password, UID) {
    //sign up
    fetch("http://localhost:5000/users/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        userName: userName,
        password: password,
        UID: UID,
      }),
    });
  }

  const callbackFunction2 = (newUser) => {
    setModalShow2(false);
    if (newUser !== undefined) {
      app
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((res) => {
          if (res) {
            alert("sign up success");
            console.log(res);
            forwardNewUser(
              newUser.email,
              newUser.userName,
              newUser.password,
              res.user.uid
            );
          }
        })
        .catch(function (error) {
          if (error) {
            alert("sign up failed");
            console.log(error);
          }
        });
    }
  };
  function removeLocal() {
    localStorage.removeItem(LOCAL_STORAGE_KEY1);
    localStorage.removeItem(LOCAL_STORAGE_KEY2);
    localStorage.removeItem(LOCAL_STORAGE_KEY3);
    setisLogIn(false);
  }

  if (isLogIn) {
    return (
      <div>
        {isLogIn ? (
          <div className="centerLogOut">
            <Button
              variant="contained"
              className="userButton"
              onClick={() => removeLocal()}
            >
              Sign Out
            </Button>
            {user.email}
            {user.password}
            {user.UID}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      {!isLogIn ? (
        <div className="centerLogin">
          <Button
            variant="contained"
            className="userButton"
            onClick={() => setModalShow2(true)}
          >
            Sign up
          </Button>
          <br /> <br />
          <Button
            variant="contained"
            className="userButton"
            onClick={() => setModalShow3(true)}
          >
            Log in
          </Button>
        </div>
      ) : null}

      <SignupModal show={modalShow2} onHide={callbackFunction2} />
      <LoginModal show={modalShow3} onHide={callbackFunction3} />
    </div>
  );
}
