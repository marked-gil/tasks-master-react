import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/SignUpPage.module.css'

function SignUpPage() {
  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUpBox}>
        <p className="mb-5">LOGO - Tasks Master</p>
        <h1>Sign Up</h1>
        <Form className={`d-flex flex-column mt-5 ${styles.Form}`}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter a username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter a password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="repeat-password">
            <Form.Label>Password (again)</Form.Label>
            <Form.Control type="password" placeholder="Repeat the password" />
            <Form.Text className="text-muted">
              
              </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <div className="d-flex mt-5">
          <p className="me-5">Already registered?</p>
          <a href="#">SIGN IN</a>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;