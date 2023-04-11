import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/TaskDetailsPage.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory, useParams } from 'react-router-dom';
import { FloatingLabel } from 'react-bootstrap';
import { getCategories } from '../../api/categoryMethods';
import { deleteTask } from '../../api/taskMethods';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';

function TaskDetailsPage() {

  const history = useHistory();
  const { id } = useParams();
  const [ categories, setCategories ] = useState({ results: []});
  const [ taskData, setTaskData ] = useState({});
  const [ editCategory, setEditCategory ] = useState(false);
  const [ editDuePriority, setEditDuePriority ] = useState(false);

  const {
    task_name, 
    details, 
    category, 
    due_date, 
    due_time, 
    priority, 
    progress
  } = taskData;

  useMemo(() => {
    getCategories(setCategories);
  }, [setCategories])

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

  const handleDelete = () => {
    deleteTask(id)
    history.push("/")
  }

  const priorityDueForm = <>
    <div className="d-flex">
      <DateTimePicker
        label="Set Date and Time"
        className={`mt-3 me-2 ${styles.DateTimePicker}`}
        value={moment(due_date, due_time)}
        slotProps={{
          textField: {
            helperText: 'MM / DD / YYYY',
          },
        }}
      />

      <Form.Group className={`align-self-center mb-3 ${styles.PriorityForm}`}>
        <Form.Label htmlFor="priority" className="mb-0">Priority</Form.Label>
        <Form.Select
          id="priority"
          name="priority"
          defaultValue={priority}
          // onChange={handlePriorityChange}
          // size="sm" 
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
  </>

  return (
    <Col className={styles.TaskDetails}>
      <div className={`${styles.Container} position-relative`}>
        <h2 className={`${styles.MyTasks}`}>Task Details</h2>
        {/* DELETE BUTTON */}
        <Button onClick={handleDelete} size="sm" variant='danger' className={styles.DeleteButton}>Delete Task</Button>

        <div className="d-flex flex-column mt-3 mb-4">
          <p className={`d-flex mb-0 ${styles.CategoryWrapper}`}>
            <span className={`me-4`}>Category:</span>
            { 
              editCategory ? 
                <>
                  {/* CATEGORIES */}
                  <div className="d-flex">
                    <Form.Select
                      className={`me-3 pt-0 pb-0 ${styles.EditFormSelect }`}
                      aria-label="Select category"
                      name="category_name"
                      // onChange={handleFilterChange}
                      size="sm"
                    >
                      {categories.results.map((cat) => (
                        <option
                          value={cat.id}
                          key={cat.category_name}
                        >
                          {cat.category_name}
                        </option>
                        ))
                      }
                    </Form.Select>
                  </div>
                </>
              : <span className={styles.bold}>{category}</span>
            }
            { editCategory &&
              <Button variant="link" onClick={setEditCategory} className="ms-3 p-0" size="sm">Save</Button> 
            }
            { !editCategory && 
              <Button variant="link" onClick={setEditCategory} className="ms-5 p-0" size="sm">edit</Button> 
            }
          </p>
          {/* DUE DATETIME | PRIORITY | PROGRESS */}
          <p className="d-flex justify-content-between mb-0">
            { editDuePriority ? <>{priorityDueForm}</> 
              : <>
                <div>
                  <span className="me-2">Due:</span> <span className={styles.bold}>{due_date} {due_time ? `- ${due_time}` : ""}</span>
                </div> | 
                <span>{priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}</span> | 
                <span>{progress}</span>
              </>
            }
            
            { editDuePriority &&
              <div className="align-self-center">
                <Button onClick={setEditDuePriority} variant="link" size="sm" className="ms-3 p-0">cancel</Button>
                <Button onClick={setEditDuePriority} variant="link" size="sm" className="ms-2 p-0">Save</Button>
              </div>

            }
            { !editDuePriority &&
              <Button onClick={setEditDuePriority} variant="link" size="sm" className="ms-3 me-3 p-0">edit</Button>
            }
          </p>
        </div>

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