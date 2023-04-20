import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/TaskDetailsPage.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Avatar from '../../assets/profile-avatar.jpg';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory, useParams } from 'react-router-dom';
import { Card, FloatingLabel } from 'react-bootstrap';
import { deleteTask } from '../../api/taskMethods';
import ProfileAvatar from '../../components/ProfileAvatar';
import EditTaskAttributes from './EditTaskAttributes';
import ShareTaskModal from './ShareTaskModal';
import AddCommentModal from '../comments/AddCommentModal';
import FeedbackMessage from '../../components/FeedbackMessage';

function TaskDetailsPage({ categories }) {

  const history = useHistory();
  const { id } = useParams();
  const [ taskData, setTaskData ] = useState({});
  const [ editTaskName, setEditTaskName ] = useState(false);
  const [ editTaskDescription, setEditTaskDescription ] = useState(false);
  const [ closeAllEdits, setCloseAllEdits ] = useState(false);
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ Comments, setComments ] = useState({ results: [] });

  const {
    owner,
    task_name, 
    details, 
    category, 
    due_date, 
    due_time, 
    priority, 
    progress,
    shared_to,
  } = taskData;

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

  useEffect(() => {
    const getComments = async() => {
      try {
        const { data } = await axiosReq.get(`/comments/?task=${id}`)
        setComments(data)
        console.log('comments', data)
      } catch (err) {
        console.log(err.response)
      }
    }
    getComments();
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

  const handleShareTask = (newTaskData) => {
    setTaskData(newTaskData);
  }

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
      <div className={`${styles.Container}`}>
        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}
        <div className="position-relative">
          <h2 className={`${styles.MyTasks}`}>Task Details</h2>
          <div className="position-absolute top-0 end-0">
            {/* SHARE BUTTON */}
            <ShareTaskModal
              task_name={task_name}
              task_id={id}
              set_task_data={setTaskData}
              taskData={taskData}
              handleShareTask={handleShareTask}
            />
            {/* DELETE BUTTON */}
            <Button onClick={handleDelete} size="sm" variant='danger'>Delete Task</Button>
          </div>
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

          {editTaskName && 
            <div className={`position-absolute bottom-0 end-0`}>
              <Button variant="link" size="sm" onClick={cancelEditTaskName}>
                cancel
              </Button>
              <Button variant="link" size="sm" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>}
          {!editTaskName &&
            <Button variant="link" size="sm" onClick={setEditTaskName} className={`position-absolute bottom-0 end-0`}>
              edit
            </Button>}
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
          
          {editTaskDescription && 
            <div className={`position-absolute bottom-0 end-0`}>
              <Button variant="link" size="sm" onClick={cancelEditTaskDescription}>
                cancel
              </Button>
              <Button variant="link" size="sm" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>}  
          {!editTaskDescription &&
            <Button variant="link" size="sm" onClick={setEditTaskDescription} className={`position-absolute bottom-0 end-0`}>
              edit
            </Button>}

        </Form.Group>

        {/* OWNER AVATAR */}
        <ProfileAvatar
          owner={owner}
          isOwner={true}
          showName={true}
          img_src={Avatar}
          imageWidth={"2rem"}
          className={styles.OwnerAvatar} 
        />

        <div className={`d-flex flex-column position-absolute ${styles.Avatars}`}>
          {taskData.is_shared &&
            <p className={`mb-0 align-self-center ${styles.bold}`}>
              <i className="fa-solid fa-share-nodes"></i> Sharing with:
            </p>}
          
          {shared_to?.map((user) => (
            <>
              <ProfileAvatar
                owner={user}
                isOwner={false}
                showName={true}
                // image={Avatar}
                imageWidth={"1.5rem"}
                isDeletable
                className={styles.SharedToAvatar}
                taskData={taskData}
                setTaskData={setTaskData}
              />
            </>
            ))
          }
        </div>
        

        {/* COMMENT SECTION */}
        <div>
          <AddCommentModal 
            id={id} 
            taskData={taskData} 
            setComments={setComments} 
            setFeedbackMessage={setFeedbackMessage}
          />

          <h2>Comments</h2>
          {
            Comments.results.map(comment => (
              <Card key={comment.id} className="mb-1">
                <Card.Title>{comment.owner}</Card.Title>
                <Card.Subtitle>{comment.datetime_updated}</Card.Subtitle>
                <Card.Body className="pt-1 pb-1">{comment.content}</Card.Body>
                <div className="d-flex justify-content-end gap-2 mb-1">
                  <Button size="sm" className="pt-0 pb-0 ps-2 pe-2">Edit</Button>
                  <Button variant="danger" size="sm" className="pt-0 pb-0 ps-2 pe-2">Delete</Button>
                </div>
              </Card>
            ))
          }
        </div>
      </div>
    </Col>
  )
};

export default TaskDetailsPage;