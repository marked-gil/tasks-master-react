import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../styles/SignInPage.module.css'
import { Alert } from 'react-bootstrap';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../../utils/utils';

function SignInPage() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = signInData;

  const [ errors, setErrors ] = useState({});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push('/');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.SignInPage}>
      <div className={styles.SignInBox}>
        <p className="mb-5">LOGO - Tasks Master</p>

        <h1>Sign In</h1>

        <Form onSubmit={handleSubmit} className={`d-flex flex-column mt-5 ${styles.Form}`}>
          {errors.non_field_errors?.map((error, idx) => (
            <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
              {error}
            </Alert>
            ))
          }

          <Form.Group className="mb-3" controlId="username">
            <Form.Label className={styles.bold}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
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
            <Form.Label className={styles.bold}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
            />

            {errors.password?.map((error, idx) => (
              <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                {error}
              </Alert>
              ))
            }
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