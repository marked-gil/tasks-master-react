import { useMemo, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
  const [ editedProfile, setEditedProfile ] = useState({});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ errors, setErrors ] = useState({});
  const [ warningFirstName, setWarningFirstName ] = useState({});
  const [ warningLastName, setWarningLastName ] = useState({});
  const [ warningEmail, setWarningEmail ] = useState({});

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
          setEditedProfile(data);
          setIsLoaded(true);
        } catch (err) {
          setIsLoaded(true);
        }
      }

      handleMount();
    }
  },[profile_id]);

  const handleCancel = () => {
    setEditedProfile(profileData);
    setWarningFirstName({});
    setWarningLastName({});
    setWarningEmail({});
  }

  const handleChange = (event) => {
    setEditedProfile(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedbackMessage("");
    setErrors({});

    let hasChanged = false;
    let hasBeenEmptied = false;

    const formData = new FormData();
    if (editedProfile.first_name !== first_name) {
      if (editedProfile.first_name.length === 0) {
        hasBeenEmptied = true;
        setWarningFirstName({ border: "1px solid red" });
      } else {
        formData.append('first_name', editedProfile.first_name);
        hasChanged = true;
        setWarningFirstName({})
      }
    }

    if (editedProfile.last_name !== last_name) {
      if (editedProfile.last_name.length === 0) {
        hasBeenEmptied = true;
        setWarningLastName({ border: "1px solid red" });
      } else {
        formData.append('last_name', editedProfile.last_name);
        hasChanged = true;
        setWarningLastName({});
      }
    }

    if (editedProfile.email !== email) {
      if (editedProfile.email.length === 0) {
        hasBeenEmptied = true;
        setWarningEmail({ border: "1px solid red" });
      } else {
        formData.append('email', editedProfile.email);
        hasChanged = true;
        setWarningEmail({})
      }
    }

    if (hasChanged && !hasBeenEmptied) {
      setIsLoaded(false);
      try {
        const { data } = await axiosReq.put(`profiles/${profile_id}/`, formData);
        setTimeout(() => {
          setProfileData(data);
          setEditedProfile(data);
          setFeedbackMessage("Your profile information is successfully updated.");
          setIsLoaded(true);
        }, 1000)
      } catch (err) {
        setErrors(err.response?.data);
        setIsLoaded(true);
      }
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

          <Form onSubmit={handleSubmit} noValidate className={styles.Form}>
            <div className={`position-relative ${styles.ImageUsernameDiv}`}>
              <img src={image} alt="profile" className={styles.profileImage} />
              <UpdateProfileImage
                profile_id={profile_id}
                profileData={profileData}
                setProfileData={setProfileData}
                setFeedbackMessage={setFeedbackMessage}
                className={styles.uploadIcon}
              />

              {errors.generic?.map((error, idx) => (
                <Alert className={`mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
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
                    disabled
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
                value={editedProfile.first_name || ""}
                onChange={handleChange}
                style={warningFirstName}
              />
            </Form.Group>
            {errors.first_name?.map((error, idx) => (
                <Alert className={`mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }

            {/* LAST NAME */}
            <Form.Group className={`${styles.LastNameGroup}`} controlId="last-name">
              <Form.Label className={`ps-0 ${styles.bold}`} style={{ width:"8rem" }}>Last Name:</Form.Label>
              <Form.Control
                type="text"
                maxLength={50}
                placeholder="Enter your last name"
                name="last_name"
                value={editedProfile.last_name || ""}
                onChange={handleChange}
                style={warningLastName}
              />
            </Form.Group>
            {errors.last_name?.map((error, idx) => (
                <Alert className={`mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            
            {/* EMAIL */}
            <Form.Group className={`${styles.EmailGroup}`} controlId="email">
              <Form.Label className={`ps-0 ${styles.bold}`} style={{ width:"8rem" }}>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={editedProfile.email || ""}
                onChange={handleChange}
                style={warningEmail}
              />
            </Form.Group>
            {errors.email?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 text-center`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }

            <div className={`${styles.ButtonsGroup}`}>
              <Button variant="secondary" size="sm" onClick={handleCancel}>cancel</Button>
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
        </div>
      </div>
    </Col>
  )
}

export default ProfilePage;