import React, { setState, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);
export default function SignupModal(props) {
  const classes = useStyles();
  const height = 100;

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [alert4, setAlert4] = useState(false);
  const [x, setX] = useState(false);

  function handleSubmit() {
    if (
      email.includes("@") &&
      email.includes("colgate") &&
      password.length >= 8 &&
      userName.length >= 3
    ) {
      props.onHide({ email: email, password: password, userName: userName });
    }

    if (!email.includes("@")) {
      setAlert3(true);
    } else {
      setAlert3(false);
      if (!email.includes("colgate")) {
        setAlert1(true);
      } else {
        setAlert1(false);
      }
    }

    if (password.length < 8) {
      setAlert2(true);
    } else {
      setAlert2(false);
    }

    if (userName.length < 3) {
      setAlert4(true);
    } else {
      setAlert4(false);
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          label="Name"
          id="outlined-margin-dense"
          defaultValue=""
          className={classes.textField}
          helperText=""
          margin="dense"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <TextField
          label="Email"
          id="outlined-margin-dense"
          defaultValue="xxxxx@colgate.edu"
          className={classes.textField}
          helperText=""
          margin="dense"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          id="outlined-margin-dense"
          defaultValue=""
          className={classes.textField}
          helperText=""
          margin="dense"
          variant="outlined"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        {/* Your name:{" "} */}
        {/* <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <br />
        <br />
        email: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>{" "}
        (only kolgate email is accepted)
        <br />
        <br />
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <br /> */}
        {alert3 ? (
          <plaintext>*you must enter an email addresss</plaintext>
        ) : null}
        {alert1 ? <plaintext>*only kolgate email is accepted</plaintext> : null}
        {alert2 ? <plaintext>*your password is too simple</plaintext> : null}
        {alert4 ? <plaintext>*your name is too short</plaintext> : null}
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          sign up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
