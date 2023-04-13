import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/ShareTaskModal.module.css'
import { Form, InputGroup } from 'react-bootstrap';

function ShareTaskModal(props) {

  const {
    taskData,
  } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="position-relative">
        <Modal.Title id="contained-modal-title-vcenter">
          {taskData.task_name}
        </Modal.Title>
        <p className={`position-absolute ${styles.TaskName}`}>Task Name</p> 
      </Modal.Header>
      <Modal.Body >
        <p className="mb-0">Enter task recipient's username:</p>
        <InputGroup className="mb-3">
          <InputGroup.Text id="share_to_username">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="share_to_username"
          />
          <Button>Share Now</Button>
        </InputGroup>
        <p style={{color: "red"}}>Feedback Message Here</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareTaskModal;