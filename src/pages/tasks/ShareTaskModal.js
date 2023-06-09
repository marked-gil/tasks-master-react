import { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from '../../styles/ShareTaskModal.module.css'

// Component that renders the modal for sharing task to users
function ShareTaskModal(props) {

  const {
    task_name, 
    taskData,
    task_id,
    handleShareTask,
    setError,
    setFeedbackMessage
  } = props;

  const [ userSearch, setUserSearch ] = useState("");
  const [ userProfile, setUserProfile ] = useState({});
  const [ feedback, setFeedback ] = useState("");
  const [ successFeedback, setSuccessFeedback ] = useState(false);
  const [ show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setError("");
    setFeedbackMessage("");
  };

  const handleClose = () => {
    setShow(false);
    setUserProfile({});
    setFeedback("");
  };

  const handleChange = (event) => {
    setUserSearch(event.target.value);
  };

  const handleSearch = async () => {
    if (userSearch.toLowerCase() === taskData.owner.toLowerCase()) {
      setFeedback("You are already the owner of the task.");
      setUserProfile({});
    } else if (taskData.shared_to.length !== 4) {
      if (userSearch) {
        try {
          const { data } = await axiosReq.get(`/profiles/?search=${userSearch}`);
          const searchResult = data.results[0];
          if (!searchResult) {
            setFeedback("Username does not exist.");
          } else {
            setUserProfile(data.results[0]);
            setFeedback("");
          }
        } catch (err) {
          setFeedback("Sorry, an ERROR has occurred during database search.");
        }
      }
    } else {
      setFeedback("You can only share to a maximum of 4 users.");
    }
    setSuccessFeedback(false);
  }

  const AddNewUserToTask = async () => {
    if (taskData.shared_to.includes(userProfile.owner)) {
      setFeedback(`The task is already shared to @${userProfile.owner}.`)
    } else {
      try {
        const { data } = await axiosReq.put(`/tasks/${task_id}`, {
          ...taskData, "is_shared":true, "shared_to": [...taskData.shared_to, userProfile.owner]
        })
        handleShareTask(data)
        setUserProfile({})
        setFeedback(`@${userProfile.owner} is added to the task.`)
        setSuccessFeedback(true);
      } catch (err) {
        setFeedback("Sorry, an ERROR has occurred while attempting to add the user.")
      }
    }
  }

  return (
    <>
      <Button onClick={handleShow} className={`ms-4 ps-3 pe-3`} size="sm" variant="primary">
        <i className="fa-solid fa-share-nodes me-1"></i> Share
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton className="position-relative">
          <Modal.Title>{task_name}</Modal.Title>
          <p className={`position-absolute ${styles.TaskName}`}>Task Name</p> 
        </Modal.Header>
        <Modal.Body >
          <p className="mb-1">Enter task recipient's username:</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="share_to_username">@</InputGroup.Text>
            <Form.Control
              name="username"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="share_to_username"
              onChange={handleChange}
            />
            <Button onClick={handleSearch}>Search</Button>
          </InputGroup>

          <div className="d-flex flex-column align-items-center">
            {userProfile?.owner &&
              <>
                <Button variant="success" onClick={AddNewUserToTask}>
                  <span className="me-3">{userProfile?.owner}</span>
                  <i className="fa-solid fa-user-plus"></i>
                </Button>
                {!feedback && <p className={`mb-0 mt-3 ${styles.smallFont}`}>Click username to share task.</p>}
              </>
            }
          </div>

          {
            feedback && 
            <p className={`mt-3 mb-0 text-center
              ${styles.smallFont}`} 
              style={successFeedback ? { color:"blue", fontWeight:"600" } : { color: "red" }}
            >
              {feedback}
            </p>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShareTaskModal;