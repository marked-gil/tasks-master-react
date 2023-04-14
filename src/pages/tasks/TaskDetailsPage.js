import React, { useMemo, useState } from 'react';
import styles from '../../styles/TaskDetailsPage.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory, useParams } from 'react-router-dom';
import { FloatingLabel } from 'react-bootstrap';
import { getCategories } from '../../api/categoryMethods';
import { deleteTask } from '../../api/taskMethods';
import ProfileAvatar from '../../components/ProfileAvatar';
import EditTaskAttributes from './EditTaskAttributes';
import ShareTaskModal from './ShareTaskModal';

function TaskDetailsPage() {

  const history = useHistory();
  const { id } = useParams();
  const [ categories, setCategories ] = useState({ results: []});
  const [ taskData, setTaskData ] = useState({});
  const [ editTaskName, setEditTaskName ] = useState(false);
  const [ editTaskDescription, setEditTaskDescription ] = useState(false);
  const [ closeAllEdits, setCloseAllEdits ] = useState(false);

  const {
    owner,
    task_name, 
    details, 
    category, 
    due_date, 
    due_time, 
    priority, 
    progress,
  } = taskData;

  useMemo(() => {
    getCategories(setCategories);
  }, [setCategories])

  useMemo(() => {
    const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/tasks/${id}`);
            setTaskData(data)
          } catch (err) {
            console.log(err.response?.data)
          }
        };
    
        handleMount();
  }, [id])

  const cancelEditTaskName = () => {
    setEditTaskName(!editTaskName);
  };

  const cancelEditTaskDescription = () => {
    setEditTaskDescription(!editTaskDescription);
  };

  const handleDataChange = (event) => {
    setTaskData(prevState => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ));
  };  

  const handleSave = async (event) => {
    try {
      const { data } = await axiosReq.put(`/tasks/${id}`, {...taskData})
      setTaskData(data)
      setCloseAllEdits(true)
      setEditTaskName(false)
      setEditTaskDescription(false)
      console.log(data)
    } catch (err) {
      console.log(err.response?.data)
    }
  };

  const handleDelete = () => {
    deleteTask(id)
    history.push("/")
  };

  return (
    <Col className={styles.TaskDetails}>
      <div className={`${styles.Container} position-relative`}>
        <h2 className={`${styles.MyTasks}`}>Task Details</h2>
        
        <div className="position-absolute top-0 end-0">
          {/* SHARE BUTTON */}
          <ShareTaskModal
            task_name={task_name}
            task_id={id}
            set_task_data={setTaskData}
            task_data={taskData}
          />

          {/* DELETE BUTTON */}
          <Button onClick={handleDelete} size="sm" variant='danger'>Delete Task</Button>
        </div>

        {/* TASK ATTRIBUTES */}
        <EditTaskAttributes 
          handleDataChange={handleDataChange}
          category={category}
          categories={categories}
          handleSave={handleSave}
          due_date={due_date}
          due_time={due_time}
          priority={priority}
          progress={progress}
          closeAllEdits={closeAllEdits}
          setCloseAllEdits={setCloseAllEdits}
        />

        {/* TASK NAME */}
        <Form.Group className="mb-3 position-relative" controlId="taskName">
          <FloatingLabel controlId="floatingTaskNameArea" label="Task Name">
            <Form.Control
              type="text"
              readOnly={!editTaskName}
              maxLength={50}
              className={styles.TaskName}
              name="task_name"
              defaultValue={task_name}
              onChange={handleDataChange}
              aria-label="Edit the task name"
            />
          </FloatingLabel>

          { 
            editTaskName && 
            <div className={`position-absolute bottom-0 end-0`}>
              <Button variant="link" size="sm" onClick={cancelEditTaskName}>
                cancel
              </Button>
              <Button variant="link" size="sm" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>
          }  
          { 
            !editTaskName &&
            <Button variant="link" size="sm" onClick={setEditTaskName} className={`position-absolute bottom-0 end-0`}>
              edit
            </Button> 
          }

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
        
        {/* TASK DESCRIPTION */}
        <Form.Group className="mb-3 position-relative" controlId="taskDescription">
          <FloatingLabel controlId="floatingTextarea" label="Description">
            <Form.Control
              as="textarea" 
              style={{height: '150px'}}
              name="details"
              readOnly={!editTaskDescription}
              defaultValue={details}
              maxLength={250}
              onChange={handleDataChange}
              aria-label="Edit task description"
            />
          </FloatingLabel>
          
          {/* <Button size="sm" className={`position-absolute bottom-0 end-0`}>edit</Button> */}
          {/* {errors.details?.map((error, idx) => (
            <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
              {error}
            </Alert>
            ))
          } */}

          { 
            editTaskDescription && 
            <div className={`position-absolute bottom-0 end-0`}>
              <Button variant="link" size="sm" onClick={cancelEditTaskDescription}>
                cancel
              </Button>
              <Button variant="link" size="sm" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>
          }  
          { 
            !editTaskDescription &&
            <Button variant="link" size="sm" onClick={setEditTaskDescription} className={`position-absolute bottom-0 end-0`}>
              edit
            </Button> 
          }
        </Form.Group>
        

        {/* OWNER AVATAR */}
        <ProfileAvatar
          owner={owner}
          isOwner={true}
          showName={true}
          imageWidth={"2rem"}
          className={styles.ProfileAvatar} 
        />

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