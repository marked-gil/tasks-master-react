import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/ShareTaskModal.module.css'
import { Form, InputGroup } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

function ShareTaskModal(props) {

  const {
    task_name, 
    taskData,
    task_id,
    handleShareTask
  } = props;

  const [ userSearch, setUserSearch ] = useState("");
  const [ userProfile, setUserProfile ] = useState({});
  const [ show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setUserProfile({});
  };

  const handleChange = (event) => {
    setUserSearch(event.target.value)
  };

  const handleSearch = async () => {
    try {
      const { data } = await axiosReq.get(`/profiles/?search=${userSearch}`)
      setUserProfile(data.results[0])
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const AddNewUserToTask = async () => {
    try {
      const { data } = await axiosReq.put(`/tasks/${task_id}`, {
        ...taskData, "shared_to": [...taskData.shared_to, userProfile.owner]
      })
      handleShareTask(data)
      setUserProfile({})
      console.log(data)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <>
      <Button onClick={handleShow} className={`me-4 ps-3 pe-3`} size="sm" variant="primary">
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
                <p className={`mb-0 mt-3 ${styles.smallFont}`}>Click username to share task.</p>
              </>
            }
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareTaskModal;