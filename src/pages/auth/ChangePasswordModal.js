import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ChangePasswordModal(props) {

  const { 
    show, 
    onHide 
  } = props;

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
        <p>Provide new password on the form below.</p>
        <Form className="d-flex flex-column ps-lg-4 pe-lg-4 ps-0 pe-0">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="mb-1">New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="mb-1">Repeat New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button className="align-self-center">Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;