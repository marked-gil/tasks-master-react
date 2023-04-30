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
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import moment from 'moment';

function TaskDetailsPage({ newCategoryAdded, setTaskChanged }) {

  const history = useHistory();
  const { id } = useParams();

  const [ taskData, setTaskData ] = useState({});
  const [ editedTask, setEditedTask ] = useState({});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ editTask, setEditTask ] = useState(false);
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
    shared_to,
    is_completed,
    is_shared
  } = taskData;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        const [{data: taskData }, {data: commentData}, {data: fetchedCategories}] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
          axiosReq.get(`/comments/?task=${id}`),
          axiosReq.get(`/categories/`)
        ]);
        setTimeout(() => {
          setTaskData(taskData);
          setComments(commentData);
          setCategories(fetchedCategories);
          setIsLoaded(true);
        }, 500)
      } catch (err) {
        setError("An ERROR has occurred while fetching data. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    fetchData();
  }, [id, newCategoryAdded]);

  const handleShareTask = (newTaskData) => {
    setTaskData(newTaskData);
  }

  const handleTaskComplete = () => {
    const task = {
      ...taskData,
      "due_date": moment(new Date(taskData.due_date)).format("yyyy-MM-DD"),
      "is_completed": true
    }

    const updateTasks = async () => {
      setIsLoaded(false);
      try {
        const { data } = await axiosReq.put(`/tasks/${id}`, task);
        setTimeout(() => {
          setTaskData(data);
          setFeedbackMessage("This task is set as COMPLETE.")
          setIsLoaded(true);
        }, 1000);
      } catch (err) {
        setFeedbackMessage("");
        setError("Sorry, an error has occurred while updating the task.");
        setIsLoaded(true);
      }
    }
    updateTasks();
  }

  const handleTaskIncomplete = async () => {
    setIsLoaded(false);
    try {
      const { data } = await axiosReq.put(`/tasks/${id}`, {
        ...taskData, "datetime_completed": null, "is_completed": false
      });
      setTimeout(() => {
        setTaskData(data);
        setFeedbackMessage("This task has been UNDONE.")
        setIsLoaded(true);
      }, 1000);
    } catch (err) {
      setFeedbackMessage("");
      setError("Sorry, an error has occurred while updating the task.");
      setIsLoaded(true);
    }
  }

  const handleDataChange = (event) => {
    setEditedTask(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
      })
    );
  };

  const cancelTaskEdit = () => {
    setEditedTask(taskData);
    setEditTask(false);
    setError("");
    setFeedbackMessage("");
  };

  const handleTaskUpdate = async () => {
    setIsLoaded(false);
    setError("");

    try {
      const { data } = await axiosReq.put(`/tasks/${id}`, {...taskData, ...editedTask});
      setTimeout(() => {
        setTaskData(data);
        setFeedbackMessage("Task is successfully updated.");
        setEditTask(false);
        setIsLoaded(true);
      }, 1000);
    } catch (err) {
      if (err.response?.data?.task_name) {
        setError("You cannot submit an empty Task Name.")
      } else {
        setError("Sorry, an error has occurred while updating data.");
      }
      setIsLoaded(true);
    }
  };

  const handleTaskDelete = async() => {
    setError("");
    setFeedbackMessage("");
    setIsLoaded(false);
    try {
      await axiosRes.delete(`/tasks/${id}`)
      setTimeout(() => {
        setIsLoaded(true);
        setTaskChanged(true);
        history.goBack();
      }, 1000);
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
          <h2 className={`${styles.HeadingTaskDetails} ${!is_completed && styles.AddMarginBottom}`}>
            Task Details
          </h2>

          {is_owner && 
            <>
              <div className={`${styles.DeleteSharedButtons}`}>
                {/* DELETE BUTTON */}
                <Button onClick={handleTaskDelete} size="sm" variant='danger'>Delete Task</Button>

                {/* SHARE BUTTON */}
                {!is_completed && 
                  <ShareTaskModal
                    task_name={task_name}
                    task_id={id}
                    set_task_data={setTaskData}
                    taskData={taskData}
                    handleShareTask={handleShareTask}
                    setError={setError}
                    setFeedbackMessage={setFeedbackMessage}
                  />}
                {is_completed && 
                  <Button size="sm" className={styles.SetIncompleteButton} 
                    onClick={handleTaskIncomplete}
                  >
                    Set as INCOMPLETE
                  </Button>
                }
              </div>
              {/* SET AS COMPLETE BUTTON */}
              {!is_completed && 
                <Button size="sm" className={styles.SetCompleteButton} 
                  onClick={handleTaskComplete}
                >
                  Set as COMPLETE
                </Button>
              }
            </>
          }
        </div>

        {/* TASK ATTRIBUTES */}
       <EditTaskAttributes
          taskData={taskData}
          categories={categories}
          setIsLoaded={setIsLoaded}
          setError={setError}
          setFeedbackMessage={setFeedbackMessage}
          is_owner={is_owner}
          isLoaded={isLoaded}
        />

        {/* FOR SMALL SCREEN AVATARS */}
        <Accordion className={styles.SmallScreenAvatars}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>See the owner and users sharing this task.</Accordion.Header>
            <Accordion.Body className={styles.AccordionBodyAvatar}>
              {/* OWNER AVATAR */}
              {profile_image &&
                <ProfileAvatar
                  owner={owner}
                  isOwner={true}
                  showName={true}
                  img_src={profile_image}
                  imageWidth={"1.5rem"}
                  nameFontSize={"13px"}
                />
              }
              {/* USERS SHARING THE TASK */}
              {is_shared && 
                <div className={`d-flex gap-1 justify-content-evenly flex-wrap`}>
                  {shared_to?.map((user) => (
                    <ProfileAvatar
                      key={user}
                      owner={user}
                      isOwner={false}
                      showName={true}
                      img_src={userAvatar}
                      imageWidth={"1.5rem"}
                      taskData={taskData}
                      setTaskData={setTaskData}
                      className={`${styles.SharedToAvatar} ${styles.AccordionSharedToAvatar}`}
                    />))
                  }
                </div>
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* TASK NAME */}
        {!editTask && 
          <div className="position-relative">
            <p className={styles.TaskName}>{task_name}</p>
            <h3 className={`text-muted ${styles.HeadingTaskName}`}>Task Name</h3>
          </div>
        }

        {editTask && 
          <Form.Group className={`mb-3 position-relative`} controlId="taskName">
            <Form.Control
              as="textarea"
              autoFocus
              rows={3}
              plaintext
              maxLength={150}
              name="task_name"
              defaultValue={editedTask.task_name ? editedTask.task_name : task_name}
              onChange={handleDataChange}
              className={`${styles.TaskName} ${styles.ActiveForm}`}
              aria-label="Edit the task name"
            />
            <h3 className={styles.HeadingTaskName}>Task Name</h3>
          </Form.Group>
        }
        
        {/* TASK DETAILS/DESCRIPTION */}
        {!editTask && 
          <div className={`${styles.TaskDetailsContainer}`}>
            <p className={styles.TaskDetails}>{details}</p>
            <h3 className={`text-muted ${styles.HeadingDetails}`}>Details</h3>
          </div>
        }
        {editTask && 
          <Form.Group className="position-relative" controlId="taskDescription">
            <Form.Control
              as="textarea"
              style={{ height:"150px" }}
              plaintext
              name="details"
              defaultValue={editedTask.details ? editedTask.details : details}
              maxLength={1000}
              placeholder="Write your details here."
              onChange={handleDataChange}
              className={`${styles.TaskDetails} ${styles.ActiveForm}`}
              aria-label="Edit task description"
            />
            <h3 className={styles.HeadingDetails}>Details</h3>
          </Form.Group>
        }

        {!editTask && 
          <Button className="d-block mt-3 mb-2" style={{ width:"100%"}}
            onClick={setEditTask}  
          >
            Edit Task
          </Button>
        }
        {editTask && 
          <div className="d-flex gap-3 mt-3 mb-2">
            <Button variant="secondary" style={{ width:"30%"}} 
              onClick={cancelTaskEdit}
            >
              cancel
            </Button>
            <Button style={{ width:"70%"}} onClick={handleTaskUpdate}>
              SAVE
            </Button>
          </div>
        }

        {/* FOR BIG SCREEN AVATARS */}
        <div className={styles.AvatarsOuterContainer}>
          {/* OWNER AVATAR */}
          {profile_image &&
            <ProfileAvatar
              owner={owner}
              isOwner={true}
              showName={true}
              img_src={profile_image}
              imageWidth={"3rem"}
              nameFontSize={"14px"}
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
                nameFontSize={"13px"}
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
          
          <div className={styles.CommentContainer} id="scrollContainer">
            {!!comments.results.length && 
              <InfiniteScroll 
                scrollableTarget="scrollContainer"
                children={comments.results.map((comment) => (
                  <CommentCard
                    key={comment.id} 
                    comment={comment} 
                    setComments={setComments} 
                    setError={setError}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<LoadingIcon />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            }
            {!comments.results.length && 
              <p className={styles.NoCommentYet}>No Comments Yet.</p>
            }
          </div>
        </div>
      </div>
    </Col>
  )
}

export default TaskDetailsPage;