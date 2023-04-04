import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/AddTask.module.css';

function AddTask() {
  const [ taskData, setTaskData ] = useState({
    task_name: "",
    details: "",
    category: "At Home",
    due_date: ""
  });

  const { task_name, details, category, due_date } = taskData;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/tasks/", taskData);
      handleClose();
      console.log(data)
      console.log("ADDED NEW TASK successfully!")
    } catch (err) {
      console.log(err.response?.data)
    }
  }

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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Control
                type="text"
                placeholder="Task Name"
                autoFocus
                maxLength={50}
                className={styles.TaskName}
                name="task_name"
                value={task_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Control
                as="textarea" 
                rows={3} 
                name="details"
                value={details}
                placeholder="Description" 
                maxLength={250}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Select
              name="category"
              value={category}
              onChange={handleChange}
              size="sm" 
              aria-label="Select task category"
            >
              <option>Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>

            <Form.Group>
              <Form.Label htmlFor="due_date">Due Date</Form.Label>
              <Form.Control
                type="date"
                id="due_date"
                name="due_date"
                value={moment(due_date).format("yyyy-MM-DD")}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;