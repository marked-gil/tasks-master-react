import React, { useMemo, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/ProfilePage.module.css';
import UpdateProfileImage from './UpdateProfileImage';
import LoadingIcon from '../../components/LoadingIcon';
import FeedbackMessage from '../../components/FeedbackMessage';
import ChangePasswordModal from '../auth/ChangePasswordModal';

function ProfilePage ({ currentUser }) {

  const profile_id = currentUser?.profile_id
  const initialData = { 
    owner: "",
    first_name: "",
    last_name: "",
    email: "",
    image: "",
  }

  const [ profileData, setProfileData ] = useState(initialData);
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ errors, setErrors ] = useState({});
  const [ changePassModalShow, setChangePassModalShow ] = useState(false);

  const {
    owner,
    first_name,
    last_name,
    email,
    image,
  } = profileData;


  useMemo(() => {
    if (profile_id) {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/profiles/${profile_id}`);
          setProfileData(data);
          setIsLoaded(true);
        } catch (err) {
          setIsLoaded(true);
        }
      }

      handleMount();
    }
  },[profile_id]);

  const handleChange = (event) => {
    setProfileData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);

    try {
      setIsLoaded(false);
      setFeedbackMessage("");
      const { data } = await axiosReq.put(`profiles/${profile_id}/`, formData);
      setProfileData(data);
      setFeedbackMessage("Your profile information is successfully updated.");
      setIsLoaded(true);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Col className={styles.ProfilePage}>
      <div className={`position-relative`}>
        {!isLoaded && <LoadingIcon size="8" />}
        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}
        <ChangePasswordModal
          setIsLoaded={setIsLoaded}
          setFeedbackMessage={setFeedbackMessage}
          setChangePassModalShow={setChangePassModalShow}
          show={changePassModalShow} 
          onHide={() => setChangePassModalShow(false)}
        />

        <h2 className={styles.PageTitle}>My Profile</h2>

          <Form onSubmit={handleSubmit} className={styles.Form}>
            <div className={`position-relative ${styles.ImageUsernameDiv}`}>
              <img src={image} alt="profile" className={styles.profileImage} />
              <UpdateProfileImage
                profile_id={profile_id}
                profileData={profileData}
                setProfileData={setProfileData}
                setFeedbackMessage={setFeedbackMessage}
                className={styles.uploadIcon}
              />

              {/* USERNAME */}
              <Form.Group 
                className={`${styles.UsernameFormGroup} `}
                controlId="username"
              >
                <div className={`${styles.UsernameContainer}`}>
                  <Form.Label sm="2" className={`ps-0 mb-0 me-3 ${styles.bold}`}>
                    Username:
                  </Form.Label>
                  <Form.Control
                    className={styles.UsernameFormControl}
                    type="text"
                    readOnly
                    value={owner}
                  />
                </div>
                <Form.Text className={`text-muted position-absolute ${styles.smallInfo}`}>
                  Username cannot be changed.
                </Form.Text>
              </Form.Group>
            </div>

            {/* FIRST NAME */}
            <Form.Group className={`${styles.FirstNameGroup}`} controlId="first-name">
              <Form.Label className={`ps-0 ${styles.bold}`} style={{ width:"8rem" }}>
                First Name:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                maxLength={50}
                name="first_name"
                value={first_name}
                onChange={handleChange}
              />

              {errors.first_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>

            {/* LAST NAME */}
            <Form.Group className={`${styles.LastNameGroup}`} controlId="last-name">
              <Form.Label className={`ps-0 ${styles.bold}`} style={{ width:"8rem" }}>Last Name:</Form.Label>
              <Form.Control
                type="text"
                maxLength={50}
                placeholder="Enter your last name"
                name="last_name"
                value={last_name}
                onChange={handleChange}
              />

              {errors.last_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>
            
            {/* EMAIL */}
            <Form.Group className={`${styles.EmailGroup}`} controlId="email">
              <Form.Label className={`ps-0 ${styles.bold}`} style={{ width:"8rem" }}>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {errors.email?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>

            <div className={`${styles.ButtonsGroup}`}>
              <Button variant="secondary" size="sm">cancel</Button>
              <Button variant="primary" type="submit">Update</Button>
            </div>
          </Form>
        <div className="d-flex flex-column">
          <Button
            variant="secondary" 
            size="sm" 
            className="mt-5 align-self-start"
            onClick={() => {
              setChangePassModalShow(true)
              setFeedbackMessage("")
            }}
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

export default ProfilePage;