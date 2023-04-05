import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/AddTask.module.css';
import { Alert } from 'react-bootstrap';

function AddTask({ tasks, setTasks }) {

  const initialTaskData = { 
    task_name: "",
    details: "",
    category: "At Home",
  };

  const [ taskData, setTaskData ] = useState(initialTaskData);
  const [ dueDate, setDueDate ] = useState({due_date: ""});
  const [ errors, setErrors ] = useState({});
  const [ show, setShow ] = useState(false);

  const { task_name, details, category } = taskData;
  const { due_date } = dueDate;

  const handleClose = () => {
    setShow(false);
    setTaskData(initialTaskData);
    setDueDate({due_date: ""});
    setErrors({});
  };
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setDueDate({
      [event.target.name]: moment(event.target.value).format("yyyy-MM-DD")
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/tasks/", {...taskData, due_date});
      handleClose();
      setTasks({results: [...tasks.results, data]})
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err.response?.data)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i className="fa-solid fa-plus"></i> Add Task
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
                name="task_name"
                value={task_name}
                onChange={handleChange}
              />

              {errors.task_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error === 'This field must be unique for the "due_date" date.'
                  ? "Task with the same name already exists for this date."
                  : error
                }
                </Alert>
                ))
              }
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

              {errors.details?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
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
                onChange={handleDateChange}
              />

               {errors.due_date?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {
                    error === "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
                    ? "You need to provide a due date."
                    : error
                  }
                </Alert>
                ))
              }
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