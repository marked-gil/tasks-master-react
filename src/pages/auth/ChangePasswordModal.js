import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

function ChangePasswordModal(props) {

  const { 
    show, 
    onHide,
    setFeedbackMessage,
    setChangePassModalShow,
    setIsLoaded
  } = props;

  const [ newPassword, setNewPassword ] = useState({new_password1: "", new_password2: ""});

  const handleChange = (event) => {
    setNewPassword(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoaded(false);
    setChangePassModalShow(false);

    setTimeout(async() => {
      try {
        const { data  }= await axiosReq.post('dj-rest-auth/password/change/', newPassword);
        setFeedbackMessage(data.detail);
        setIsLoaded(true);
      } catch (err) {
        console.log(err.response);
        setIsLoaded(true);
      }
    }, 3000);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Provide your new password on the form below.</p>
        <Form className="d-flex flex-column ps-lg-4 pe-lg-4 ps-0 pe-0">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="mb-1">New Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" name="new_password1" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="mb-1">Repeat New Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat (New Password)" name="new_password2" onChange={handleChange} />
          </Form.Group>

          <Button className="align-self-center" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;