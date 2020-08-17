import React, { setState, useState } from "react";
import { TextField } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
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
export default function LoginModal(props) {
  const classes = useStyles();
  const height = 200;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert1, setAlert1] = useState(false);
  //   const [alert2, setAlert2] = useState(false);
  //   const [alert3, setAlert3] = useState(false);

  function handleSubmit() {
    setAlert1(false);
    if (email.length > 0 && password.length > 0) {
      if (alert1 == false) {
        props.onHide({ email: email, password: password });
      }
    } else {
      setAlert1(true);
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
        <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          label="Email"
          id="outlined-margin-dense"
          defaultValue=""
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
          defaultValue="xxxxx@colgate.edu"
          className={classes.textField}
          helperText=""
          margin="dense"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        {alert1 ? <plaintext>*both fields cannot be empty</plaintext> : null}
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          log in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
