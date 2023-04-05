import React, { useEffect, useState } from 'react';
import styles from '../../styles/TaskDetails.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom';

function TaskDetails() {

  const [ taskData, setTaskData ] = useState({})

  const {
    task_name, 
    details, 
    category, 
    due_date, 
    due_time, 
    priority, 
    progress
  } = taskData;

  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}`);
        setTaskData(data)
        console.log(data)
      } catch (err) {
        console.log(err.response?.data)
      }
    };

    handleMount();
  }, [id] )

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Col className={styles.TaskDetails}>
      <div className={styles.Container}>
        <h2 className={`${styles.MyTasks}`}>Task Details</h2>
        <p>Category: {category}</p>
        <p>
          <span>Due: {due_date} {due_time ? `- ${due_time}` : ""}</span> | 
          <span>{priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}</span> | 
          <span>{progress}</span>
        </p>  

        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task Name"
            readOnly
            maxLength={50}
            className={styles.TaskName}
            name="task_name"
            defaultValue={task_name}
            onChange={handleChange}
            aria-label="Add the task's name"
          />
          <Button size="sm">edit</Button>

          {/* {errors.task_name?.map((error, idx) => (
            <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
              {error === 'This field must be unique for the "due_date" date.'
              ? "Task with the same name already exists for this date."
              : error
            }
            </Alert>
            ))
          } */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea" 
            rows={3} 
            name="details"
            readOnly
            defaultValue={details}
            placeholder="Description" 
            maxLength={250}
            onChange={handleChange}
            aria-label="Add the task's description or details"
          />
          <Button size="sm">edit</Button>
          {/* {errors.details?.map((error, idx) => (
            <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
              {error}
            </Alert>
            ))
          } */}
        </Form.Group>


      </div>
    </Col>
  )
};

export default TaskDetails;