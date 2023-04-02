import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import styles from '../../styles/SignInPage.module.css'

function SignInPage() {
  return (
    <div className={styles.SignInPage}>
      <div className={styles.SignInBox}>
        <p className="mb-5">LOGO - Tasks Master</p>
        <h1>Sign In</h1>
        <Form className={`d-flex flex-column mt-5 ${styles.Form}`}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className={styles.bold}>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className={styles.bold}>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
        
        <div className="d-flex flex-column mt-5">
          <a className="mb-4" href="#">Forgot Password?</a>

          <div className="d-flex">
            <p className="me-5">Not registered?</p>
            <Link to="/signup">SIGN UP</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage;