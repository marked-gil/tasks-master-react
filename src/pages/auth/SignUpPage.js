import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import styles from '../../styles/SignUpPage.module.css'
import { Link, useHistory } from 'react-router-dom';

function SignUpPage() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push('/signin');
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUpBox}>
        <p className="mb-5">LOGO - Tasks Master</p>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit} className={`d-flex flex-column mt-5 ${styles.Form}`}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
              name="username"
              value={username}
              onChange={handleChange}
            />

            {errors.username?.map((error, idx) => (
              <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                {error}
              </Alert>
              ))
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />

            {errors.password1?.map((error, idx) => (
              <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                {error}
              </Alert>
              ))
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="repeat-password">
            <Form.Label>Password (again)</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat the password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            {errors.password2?.map((error, idx) => (
              <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                {error}
              </Alert>
              ))
            }
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

        </Form>

        <div className="d-flex mt-5">
          <p className="me-5">Already registered?</p>
          <Link to="/signin">SIGN IN</Link>
        </div>

      </div>
    </div>
  )
}

export default SignUpPage;