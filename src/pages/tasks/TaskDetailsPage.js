import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/TaskDetailsPage.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory, useParams } from 'react-router-dom';
import { deleteTask } from '../../api/taskMethods';
import EditTaskAttributes from './EditTaskAttributes';
import ShareTaskModal from './ShareTaskModal';
import AddCommentModal from '../comments/AddCommentModal';
import ProfileAvatar from '../../components/ProfileAvatar';
import FeedbackMessage from '../../components/FeedbackMessage';
import CommentCard from '../comments/CommentCard';

function TaskDetailsPage({ categories, currentUser }) {

  const profile_image = currentUser?.profile_image

  const history = useHistory();
  const { id } = useParams();
  const [ taskData, setTaskData ] = useState({});
  const [ editTaskName, setEditTaskName ] = useState(false);
  const [ editTaskDescription, setEditTaskDescription ] = useState(false);
  const [ closeAllEdits, setCloseAllEdits ] = useState(false);
  // const [ feedbackMessage, setFeedbackMessage ] = useState("");
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
    } catch (err) {
      console.log(err.response?.data)
    }
  };

  const handleDelete = () => {
    deleteTask(id)
    history.push("/")
  };

  return (
    <Col className={styles.TaskDetailsPage}>
      <div className={styles.Container}>
        {/* {feedbackMessage && <FeedbackMessage message={feedbackMessage} />} */}
        <div className="position-relative">
          <h2>Task Details</h2>
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
        {!editTaskName && 
          <div className="position-relative">
            <p className={styles.TaskName}>{task_name}</p>
            <h3 className={styles.HeadingTaskName}>Task Name</h3>

            {!editTaskDescription &&
              <Button 
                variant="link" 
                size="sm" 
                onClick={setEditTaskName}  
                className={`${styles.EditTaskNameButton}`}
              >
                edit
              </Button>
            }
          </div>
        }

        {editTaskName && 
          <Form.Group className={`mb-3 position-relative`} controlId="taskName">
            <Form.Control
              as="textarea"
              rows={2}
              plaintext
              maxLength={150}
              name="task_name"
              defaultValue={task_name}
              onChange={handleDataChange}
              className={styles.TaskName}
              aria-label="Edit the task name"
            />
            <h3 className={styles.HeadingTaskName}>Task Name</h3>

            <div className={`${styles.EditTaskNameButtonsGroup}`}>
              <Button variant="link" size="sm" onClick={cancelEditTaskName}>
                cancel
              </Button>
              <Button variant="link" size="sm" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>
          </Form.Group>
        }
        
        {/* TASK DETAILS/DESCRIPTION */}
        {!editTaskDescription && 
          <div className={`${styles.TaskDetailsContainer}`}>
            <p className={styles.TaskDetails}>{details}</p>
            <h3 className={styles.HeadingDetails}>Details</h3>

            {!editTaskDescription &&
              <Button 
                variant="link" 
                size="sm" 
                onClick={setEditTaskDescription} 
                className={`${styles.EditDetailsButton}`}
              >
                edit
              </Button>
            }
          </div>
        }
        {editTaskDescription && 
          <Form.Group className="mt-5 position-relative" controlId="taskDescription">
            <Form.Control
              as="textarea"
              style={{ height:"150px" }}
              plaintext
              name="details"
              defaultValue={details}
              maxLength={1000}
              onChange={handleDataChange}
              className={styles.TaskDetails}
              aria-label="Edit task description"
            />
            <h3 className={styles.HeadingDetails}>Details</h3>
            <div className={`${styles.EditTaskDetailsButtonsGroup}`}>
              <Button variant="link" size="sm" onClick={cancelEditTaskDescription}>
                cancel
              </Button>
              <Button variant="link" size="sm" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>
          </Form.Group>
        }  

        {/* OWNER AVATAR */}
        {profile_image &&
          <>
            <ProfileAvatar
              owner={owner}
              isOwner={true}
              showName={true}
              img_src={profile_image}
              imageWidth={"3rem"}
              className={styles.OwnerAvatar} 
            />
          </>
        }

        <div className={`d-flex flex-column position-absolute ${styles.Avatars}`}>
          {taskData.is_shared &&
            <p className={`mb-0 align-self-center ${styles.bold}`}>
              <i className="fa-solid fa-share-nodes"></i> Sharing with:
            </p>}
          
          {shared_to?.map((user, idx) => (
            <>
                      {console.log(user)}
            <ProfileAvatar
              key={idx}
              // owner={user}
              isOwner={false}
              showName={true}
              // img_src={user.image}
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
          />

          <h2>Comments</h2>
          {Comments.results.reverse().map((comment, idx) => (
            <CommentCard 
              key={idx} 
              comment={comment} 
              setComments={setComments} 
              profile_image={profile_image}
            />
          ))}
        </div>
      </div>
    </Col>
  )
};

export default TaskDetailsPage;