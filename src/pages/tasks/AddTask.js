import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/AddTask.module.css';
import { Alert } from 'react-bootstrap';
import CategorySelect from '../../components/CategorySelect';

function AddTask({ tasks, setTasks, categories }) {

  const initialTaskData = { 
    task_name: "",
    details: "",
    category: "",
  };

  const [ taskData, setTaskData ] = useState(initialTaskData);
  const [ dueDate, setDueDate ] = useState({due_date: ""});
  const [ dueTime, setDueTime ] = useState({due_time: ""});
  const [ priorityLevel, setPriorityLevel ] = useState({priority: 1});
  const [ errors, setErrors ] = useState({});
  const [ show, setShow ] = useState(false);

  const { task_name, details, category } = taskData;
  const { due_date } = dueDate;
  const { due_time } = dueTime;
  const { priority } = priorityLevel;

  const handleClose = () => {
    setShow(false);
    setTaskData(initialTaskData);
    setDueDate({due_date: ""});
    setDueTime({due_time: ""});
    setPriorityLevel({priority: 1});
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

  const handleTimeChange = (event) => {
    setDueTime({
      [event.target.name]: event.target.value
    })
  }

  const handlePriorityChange = (event) => {
    setPriorityLevel({
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/tasks/", {...taskData, due_date, due_time, priority});
      handleClose();
      setTasks({results: [...tasks.results, data]})
      console.log(data)
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
                aria-label="Add the task's name"
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
                aria-label="Add the task's description or details"
              />

              {errors.details?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>

            <div className="d-flex justify-content-between">
              <CategorySelect
                category={category}
                handleChange={handleChange}
                categories={categories}
                errors={errors}
              />

              <div className="d-flex">
                <Form.Group>
                  <Form.Control
                    type="date"
                    id="due_date"
                    name="due_date"
                    onChange={handleDateChange}
                    size="sm"
                    aria-label="Add tasks due date"
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

                <Form.Group>
                  <Form.Label htmlFor="due_time">Due Time</Form.Label>
                  <Form.Control
                    type="time"
                    id="due_time"
                    name="due_time"
                    value={due_time}
                    onChange={handleTimeChange}
                    size="sm"
                    aria-label="Add task's due time"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="priority">Priority</Form.Label>
                  <Form.Select
                    id="priority"
                    name="priority"
                    defaultValue={priority}
                    onChange={handlePriorityChange}
                    size="sm" 
                    aria-label="Select a priority level"
                  >
                    <option value="" disabled>Select Priority Level</option>
                    {[{Low: 1}, {Medium: 2}, {High: 3}].map(level => (
                      <option value={Object.values(level)[0]} key={Object.values(level)[0]}>
                        {Object.keys(level)[0]}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
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