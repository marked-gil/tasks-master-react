import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/SignInPage.module.css'
import Alert from 'react-bootstrap/Alert';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../../utils/utils';
import logo from '../../assets/tasks-master-logo-small.png';


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
      const { data } = await axios.post("/dj-rest-auth/login/", {
        ...signInData, username: signInData.username.toLowerCase() 
      });
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
        <img src={logo} alt="tasks master logo" className={styles.Logo}/>

        <h1 className={styles.HeadingSignIn}>Sign In</h1>

        <Form onSubmit={handleSubmit} className={styles.Form}>
          {errors?.non_field_errors?.map((error, idx) => (
            <Alert className={`mt-1 mb-0 pb-0 pt-0 text-center`} key={idx} variant="danger">
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
              maxLength={20}
              value={username}
              onChange={handleChange}
            />

            {errors?.username?.map((error, idx) => (
              <Alert className={`mt-1 mb-0 pb-0 pt-0 text-center`} key={idx} variant="danger">
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

            {errors?.password?.map((error, idx) => (
              <Alert className={`mt-1 mb-0 pb-0 pt-0 text-center`} key={idx} variant="danger">
                {error}
              </Alert>
              ))
            }
          </Form.Group>
          <Button type="submit" className={styles.LoginButton}>
            Log In
          </Button>
        </Form>
        
        <div className="d-flex flex-column mt-5 gap-4">
          <p className="mb-0">Not registered?
            <Link to="/signup" className={styles.SignUp}>SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage;