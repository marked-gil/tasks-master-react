import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/AddTask.module.css';

function AddTask() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i class="fa-solid fa-plus"></i> Add Task
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Control
                type="text"
                placeholder="Task Name"
                autoFocus
                maxLength={50}
                className={styles.TaskName}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="taskDescription"
            >
              <Form.Control
                as="textarea" 
                rows={3} 
                placeholder="Description" 
                maxLength={250}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;