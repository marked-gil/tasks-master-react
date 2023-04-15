import React, { useMemo, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/ProfilePage.module.css';
import SuccessFeedback from '../../components/SuccessFeedback';

function ProfilePage () {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id
  const initialData = { 
    owner: "",
    first_name: "",
    last_name: "",
    email: "",
    image: "",
  }

  const [ profileData, setProfileData ] = useState(initialData);
  const [ successFeedback, setSuccessFeedback ] = useState("");
  const [ errors, setErrors ] = useState({});

  const {
    owner,
    first_name,
    last_name,
    email,
    image,
  } = profileData;

  const handleChange = (event) => {
    setProfileData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  useMemo(() => {
    if (profile_id) {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/profiles/${profile_id}`);
          setProfileData(data)
        } catch (err) {
          console.log(err.response)
        }
      }

      handleMount();
    }
  },[profile_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);

    try {
      const { data } = await axiosReq.put(`profiles/${profile_id}`, formData);
      setProfileData(data)
      setSuccessFeedback("Your profile information is successfully updated.")
    } catch (err) {
      console.log(err.response?.data)
      setErrors(err.response?.data);
    }
  }

  return (
    <Col className={styles.ProfilePage}>
      <div>
        {successFeedback && <SuccessFeedback message={successFeedback} />}
        <h2 className={styles.PageTitle}>My Profile</h2>

          <Form onSubmit={handleSubmit} className={styles.Form}>
            <div className="d-flex position-relative mb-5">
              <img src={image} alt="profile" className={styles.profileImage} />
              <i className={`fa-solid fa-arrow-up-from-bracket fa-lg ${styles.uploadIcon}`}></i>

              {/* USERNAME */}
              <Form.Group 
                className="d-flex flex-column justify-content-center ms-3 mb-3" 
                controlId="username"
              >
                <div className="d-flex">
                  <Form.Label sm="2" className={`ps-0 mb-0 me-3 ${styles.bold}`}>
                    Username:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={owner}
                    style={{ minWidth:"18rem"}}
                  />
                </div>
                <Form.Text className={`text-muted position-absolute ${styles.smallInfo}`}>
                  Username cannot be changed.
                </Form.Text>
              </Form.Group>
            </div>

            {/* FIRST NAME */}
            <Form.Group as={Row} className="mb-3" controlId="first-name">
              <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>First Name:</Form.Label>
              <Col sm="10" className="p-0">
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                />
              </Col>

              {errors.first_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>

            {/* LAST NAME */}
            <Form.Group as={Row} className="mb-3" controlId="last-name">
              <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>Last Name:</Form.Label>
              <Col sm="10" className="p-0">
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </Col>

              {errors.last_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>
            
            {/* EMAIL */}
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>Email:</Form.Label>
              <Col sm="10" className="p-0">
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Col>
              {errors.email?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>

            <div className='d-flex justify-content-center ps-5 pt-4'>
              <Button variant='link' className='me-5 align-self-end'>cancel</Button>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        <div className="d-flex flex-column">
          <Button
            variant="secondary" 
            size="sm" 
            className="mt-5 align-self-start"
          >
            Change Password
          </Button>

          <Button 
            variant="danger" 
            className={`align-self-end mt-4 mb-4 ${styles.DeleteAccount}`}
            size="sm"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </Col>
  )
}

export default ProfilePage