import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/TaskDetailsPage.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom';
import { FloatingLabel } from 'react-bootstrap';
import { getCategories } from '../../api/categoryMethods';

function TaskDetailsPage() {

  const { id } = useParams();
  const [ categories, setCategories ] = useState({ results: []});
  const [ taskData, setTaskData ] = useState({});

  const {
    task_name, 
    details, 
    category, 
    due_date, 
    due_time, 
    priority, 
    progress
  } = taskData;

  useEffect(() => {
    getCategories(setCategories);
  }, []);

 useMemo(() => {
    const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/tasks/${id}`);
            setTaskData(data)
            console.log("this is the data returned:", data)
          } catch (err) {
            console.log(err.response?.data)
          }
        };
    
        handleMount();
  }, [id])

  const handleChange = (event) => {
    setTaskData(prevState => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ))
  }

  return (
    <Col className={styles.TaskDetails}>
      <div className={`${styles.Container} position-relative`}>
        <h2 className={`${styles.MyTasks}`}>Task Details</h2>
        <div className="d-flex flex-column mb-2">
          <p className="mb-0">Category: {category} <a href="">edit</a></p>
          <p className="mb-0">
            <span>Due: {due_date} {due_time ? `- ${due_time}` : ""}</span> | 
            <span>{priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}</span> | 
            <span>{progress}</span> <a href="">edit</a>
          </p>  
        </div>
        <Button size="sm" variant='danger' className={styles.DeleteButton}>Delete Task</Button>
        <Form.Group className="mb-3 position-relative" controlId="taskName">
          <FloatingLabel controlId="floatingTaskNameArea" label="Task Name">
            <Form.Control
              type="text"
              // placeholder="Task Name"
              readOnly
              maxLength={50}
              className={styles.TaskName}
              name="task_name"
              defaultValue={task_name}
              onChange={handleChange}
              aria-label="Add the task's name"
            />
          </FloatingLabel>
          <Button size="sm" className={`position-absolute bottom-0 end-0`}>edit</Button>

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

        <Form.Group className="mb-3 position-relative" controlId="taskDescription">
          <FloatingLabel controlId="floatingTextarea" label="Description">
            <Form.Control
              as="textarea" 
              style={{height: '150px'}}
              name="details"
              readOnly
              defaultValue={details}
              maxLength={250}
              onChange={handleChange}
              aria-label="Add the task's description or details"
            />
          </FloatingLabel>
          
          <Button size="sm" className={`position-absolute bottom-0 end-0`}>edit</Button>
          {/* {errors.details?.map((error, idx) => (
            <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
              {error}
            </Alert>
            ))
          } */}
        </Form.Group>
        
        {/* COMMENT SECTION */}
        <div>
          <a href="">Add comment</a>
          <div>
            <h2>Comments</h2>
          </div>

        </div>
      </div>
    </Col>
  )
};

export default TaskDetailsPage;