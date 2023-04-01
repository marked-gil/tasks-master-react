import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/ProfilePage.module.css';

function ProfilePage() {
  return (
    <Col className={styles.ProfilePage}>
      <div className={styles.FormContainer}>
        <h2 className={styles.PageTitle}>My Profile</h2>

        <Form className={styles.Form}>
          <Form.Group as={Row} className="mb-3" controlId="username">
            <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>
              Username:
            </Form.Label>
            <Col sm="10" className="p-0">
              <Form.Control type="text" readOnly defaultValue="markgil_d" />
              <Form.Text className="text-muted ps-1">
                Username cannot be changed.
              </Form.Text>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="first-name">
              <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>First Name:</Form.Label>
              <Col sm="10" className="p-0">
                <Form.Control type="text" placeholder="Enter your first name" />
              </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="last-name">
              <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>Last Name:</Form.Label>
              <Col sm="10" className="p-0">
                <Form.Control type="text" placeholder="Enter your last name" />
              </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="email">
            <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>Email:</Form.Label>
            <Col sm="10" className="p-0">
              <Form.Control type="email" placeholder="Enter your email address" />
            </Col>
          </Form.Group>
          <div className='d-flex justify-content-center ps-5 pt-4'>
            <a href='#' className='me-5 align-self-end'>cancel</a>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
        <a href="#" className="d-block mt-4">Change Password</a>
        <a href="#" className={`d-flex justify-content-end ${styles.DeleteAccount}`}>Delete Account</a>
      </div>
    </Col>
  )
}

export default ProfilePage