import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/ShareTaskModal.module.css'
import { Form, InputGroup } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

function ShareTaskModal(props) {

  const { task_name } = props;

  const [ userSearch, setUserSearch ] = useState("");
  const [ userProfile, setUserProfile ] = useState({});

  const handleChange = (event) => {
    setUserSearch(event.target.value)
  };

  const handleSearch = async () => {
    try {
      const { data } = await axiosReq.get(`/profiles/?search=${userSearch}`)
      setUserProfile(data.results[0])
      console.log( data.results[0] )
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="position-relative">
        <Modal.Title id="contained-modal-title-vcenter">
          {task_name}
        </Modal.Title>
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
              <Button variant="success"><span className="me-3">
                {userProfile?.owner}</span><i className="fa-solid fa-user-plus"></i>
              </Button>
              <p className={`mb-0 mt-3 ${styles.smallFont}`}>Click username to share task.</p>
            </>
          }
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareTaskModal;