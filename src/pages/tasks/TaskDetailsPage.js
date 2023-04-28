import { useEffect, useState } from 'react';
import styles from '../../styles/TaskDetailsPage.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useHistory, useParams } from 'react-router-dom';
import EditTaskAttributes from './EditTaskAttributes';
import ShareTaskModal from './ShareTaskModal';
import AddCommentModal from '../comments/AddCommentModal';
import ProfileAvatar from '../../components/ProfileAvatar';
import FeedbackMessage from '../../components/FeedbackMessage';
import CommentCard from '../comments/CommentCard';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorDisplay from '../../components/ErrorDisplay';
import userAvatar from '../../assets/user-avatar.png';

function TaskDetailsPage({ newCategoryAdded, setTaskChanged }) {

  const history = useHistory();
  const { id } = useParams();
  const [ taskData, setTaskData ] = useState({});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ editTaskName, setEditTaskName ] = useState(false);
  const [ editTaskDescription, setEditTaskDescription ] = useState(false);
  const [ closeAllEdits, setCloseAllEdits ] = useState(false);
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ error, setError ] = useState("");
  const [ comments, setComments ] = useState({ results: [] });
  const [ isLoaded, setIsLoaded ] = useState(false);

  
  const {
    owner,
    is_owner,
    profile_image,
    task_name, 
    details, 
    category, 
    due_date, 
    due_time, 
    priority, 
    progress,
    shared_to,
    is_completed
  } = taskData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        const [{data: taskData }, {data: commentData}, {data: fetchedCategories}] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
          axiosReq.get(`/comments/?task=${id}`),
          axiosReq.get(`/categories/`)
        ]);
        setTaskData(taskData);
        setComments(commentData);
        setCategories(fetchedCategories);
        setIsLoaded(true);
      } catch (err) {
        setError("An ERROR has occurred while fetching data. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    fetchData();
  }, [id, newCategoryAdded]);

  const cancelEditTaskName = () => {
    setEditTaskName(!editTaskName);
    setError("");
  };

  const cancelEditTaskDescription = () => {
    setError("");
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

  const handleSave = async () => {
    setIsLoaded(false);
    setError("");
    try {
      const { data } = await axiosReq.put(`/tasks/${id}`, {...taskData});
      setTaskData(data);
      setFeedbackMessage("Task is successfully updated.");
      setCloseAllEdits(true);
      setEditTaskName(false);
      setEditTaskDescription(false);
      setIsLoaded(true);
    } catch (err) {
      setError("Sorry, an error has occurred while updating data. Refresh the page and try again.");
      setIsLoaded(true);
    }
  };

  const handleDelete = async() => {
    setError("");
    setFeedbackMessage("");
    setIsLoaded(false);
    try {
      await axiosRes.delete(`/tasks/${id}`)
      setTimeout(() => {
        setIsLoaded(true);
        setTaskChanged(true);
        history.goBack();
      }, 1000)
    } catch (err) {
      setError("An error occurred when attempting to delete the task.");
      setIsLoaded(true);
    }
  };

  return (
    <Col className={styles.TaskDetailsPage}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.Container}>
      {error && <ErrorDisplay error={error} />}

        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}
        <div className="position-relative">
          <h2>Task Details</h2>

          {is_owner && 
            <div className={styles.DeleteSharedButtons}>
              {/* DELETE BUTTON */}
              <Button onClick={handleDelete} size="sm" variant='danger'>Delete Task</Button>

              {/* SHARE BUTTON */}
              {!is_completed && <ShareTaskModal
                task_name={task_name}
                task_id={id}
                set_task_data={setTaskData}
                taskData={taskData}
                handleShareTask={handleShareTask}
                setError={setError}
                setFeedbackMessage={setFeedbackMessage}
              />}
            </div>
          }
        </div>

        {/* TASK ATTRIBUTES */}
       <EditTaskAttributes
          is_owner={is_owner}
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
          setFeedbackMessage={setFeedbackMessage}
        />

        {/* FOR SMALL SCREEN AVATARS */}
        <Accordion className={styles.SmallScreenAvatars}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>See the owner and users sharing this task.</Accordion.Header>
            <Accordion.Body className="d-flex align-items-center gap-2">
              {/* OWNER AVATAR */}
              {profile_image &&
                <ProfileAvatar
                  owner={owner}
                  isOwner={true}
                  showName={true}
                  img_src={profile_image}
                  imageWidth={"2rem"}
                />
              }

              <div className={`d-flex gap-2 justify-content-between`}>
                {shared_to?.map((user) => (
                  <ProfileAvatar
                    key={user}
                    owner={user}
                    isOwner={false}
                    showName={true}
                    img_src={userAvatar}
                    imageWidth={"1.5rem"}
                    isDeletable
                    taskData={taskData}
                    setTaskData={setTaskData}
                    className={`${styles.SharedToAvatar} ${styles.AccordionSharedToAvatar}`}
                  />))
                }
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* TASK NAME */}
        {!editTaskName && 
          <div className="position-relative">
            <p className={styles.TaskName}>{task_name}</p>
            <h3 className={styles.HeadingTaskName}>Task Name</h3>

            {is_owner && !editTaskDescription &&
              <Button 
                variant="link" 
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
              autoFocus
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
              <Button variant="link" onClick={cancelEditTaskName}>
                cancel
              </Button>
              <Button variant="link" onClick={handleSave} className={styles.bold}>
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

            {is_owner && !editTaskDescription &&
              <Button 
                variant="link" 
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
              autoFocus
              plaintext
              name="details"
              defaultValue={details}
              maxLength={1000}
              placeholder="Write your details here."
              onChange={handleDataChange}
              className={styles.TaskDetails}
              aria-label="Edit task description"
            />
            <h3 className={styles.HeadingDetails}>Details</h3>
            <div className={`${styles.EditTaskDetailsButtonsGroup}`}>
              <Button variant="link" onClick={cancelEditTaskDescription}>
                cancel
              </Button>
              <Button variant="link" onClick={handleSave} className={styles.bold}>
                SAVE
              </Button>
            </div>
          </Form.Group>
        }  

        <div className={styles.AvatarsOuterContainer}>
          {/* OWNER AVATAR */}
          {profile_image &&
            <ProfileAvatar
              owner={owner}
              isOwner={true}
              showName={true}
              img_src={profile_image}
              imageWidth={"3rem"}
              className={styles.OwnerAvatar} 
            />
          }

          <div className={`d-flex flex-column position-absolute ${styles.AvatarsContainer}`}>
            {taskData.is_shared &&
              <p className={`mb-0 align-self-center ${styles.bold}`}>
                <i className="fa-solid fa-share-nodes"></i> Sharing with:
              </p>}
          
            {shared_to?.map((user) => (
              <ProfileAvatar
                key={user}
                owner={user}
                isOwner={false}
                showName={true}
                img_src={userAvatar}
                imageWidth={"1.5rem"}
                isDeletable
                className={styles.SharedToAvatar}
                taskData={taskData}
                setTaskData={setTaskData}
              />  
              ))
            }
          </div>
        </div>
        
        {/* COMMENT SECTION */}
        <div>
          <AddCommentModal 
            taskData={taskData} 
            setComments={setComments}
            setError={setError}
            setFeedbackMessage={setFeedbackMessage}
          />

          {!!comments.results.length && <h3 className={styles.LabelComments}>Comments</h3>}
          {!!comments.results.length && comments.results.map((comment) => (
            <CommentCard
              key={comment.id} 
              comment={comment} 
              setComments={setComments} 
              setError={setError}
            />
          ))}
          {!comments.results.length && <p className={styles.NoCommentYet}>No Comments Yet.</p>}
        </div>
      </div>
    </Col>
  )
}

export default TaskDetailsPage;