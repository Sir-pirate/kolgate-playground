import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import durian from "./durian.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import "./App.css";
import GoogleAuth from "./components/Autho0/GoogleAuth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
              Kolgate Playground
            </a>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/Contact">
                    Contact
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/LogIn">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            /* <Route path="/LogIn" component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
