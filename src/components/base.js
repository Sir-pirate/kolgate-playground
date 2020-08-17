import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDBU3PgQ6Nfz-3XRAZGu3TCzl5tKMrg4D0",
  authDomain: "kolgate-playground.firebaseapp.com",
  databaseURL: "https://kolgate-playground.firebaseio.com",
  projectId: "kolgate-playground",
  storageBucket: "kolgate-playground.appspot.com",
  messagingSenderId: "273177696038",
  appId: "1:273177696038:web:5f5bccefbec4325bf3d3e7",
});

export default app;
