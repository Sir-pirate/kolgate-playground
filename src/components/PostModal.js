import React, { setState, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";

export default function PostModal(props) {
  const height = 200;

  const [bodyText, setTextBody] = useState("");
  const [textTitle, setTextTitle] = useState("");

  function handleSubmit() {
    var d = new Date();
    var n = d.toISOString();
    props.onHide({
      title: textTitle,
      bodyText: bodyText,
      fecha: n,
      userID: props.userID,
      userName: props.userName,
      ups: [],
      downs: [],
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Title:{" "}
          <input
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
          ></input>
        </h4>

        <textarea
          name="Text"
          value={bodyText}
          cols="70"
          rows="5"
          onChange={(e) => setTextBody(e.target.value)}
        ></textarea>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
