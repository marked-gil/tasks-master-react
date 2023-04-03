import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { CurrentUserContext, useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/ProfilePage.module.css';

function ProfilePage () {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const {id} = useParams();
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    image: "",
    email: "",
  });

  const { first_name, last_name, image, email } = profileData;

  const isOwner = currentUser?.profile_id === id;

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value
    })
  }

  const handleMount = async () => {
    try {
      const { data } = await axiosReq.get(`/profiles/${id}`);
      const {first_name, last_name, image, email } = data;
      setProfileData({
        first_name: first_name,
        last_name: last_name,
        image: image,
        email: email
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    handleMount();
    setProfileData({...currentUser})
  },[currentUser, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
  
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);

    try {
      const { data } = await axiosReq.put(`profiles/${id}/`, formData);
      console.log(data)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <Col className={styles.ProfilePage}>
      <div>
        <h2 className={styles.PageTitle}>My Profile</h2>

        <Form onSubmit={handleSubmit} className={styles.Form}>
          <Form.Group as={Row} className="mb-3" controlId="username">
            <Form.Label column sm="2" className={`ps-0 ${styles.bold}`}>
              Username:
            </Form.Label>
            <Col sm="10" className="p-0">
              <Form.Control
                type="text"
                readOnly
                defaultValue={currentUser?.username}
              />
              <Form.Text className="text-muted ps-1">
                Username cannot be changed.
              </Form.Text>
            </Col>
          </Form.Group>

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
          </Form.Group>

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
          </Form.Group>

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
          </Form.Group>

          <div className='d-flex justify-content-center ps-5 pt-4'>
            <a href='#' className='me-5 align-self-end'>cancel</a>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>

        </Form>
        <a href="#" className="d-block mt-4">Change Password</a>
        <a href="#" className={`d-flex justify-content-end mt-5 ${styles.DeleteAccount}`}>Delete Account</a>
      </div>
    </Col>
  )
}

export default ProfilePage