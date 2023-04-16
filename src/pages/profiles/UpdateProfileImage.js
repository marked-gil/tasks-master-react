import React, { useEffect, useRef, useState } from 'react';
import { Button, Figure, Form, Modal } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import LoadingIcon from '../../components/LoadingIcon';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

function UpdateProfileImage(props) {
  
  const { 
    profile_id, 
    profileData, 
    setProfileData, 
    setSuccessFeedback, 
    className 
  } = props;

  const setCurrentUser = useSetCurrentUser();

  const [ imageSource, setImageSource ] = useState("");
  const [ errors, setErrors ] = useState({});
  const [ isLoaded, setIsLoaded ] = useState(true);
  const [show, setShow] = useState(false);
  const imageFile = useRef();

  const handleClose = () => {
    setShow(false)
    setImageSource(profileData.image)
    setErrors({})
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setImageSource(profileData.image);
  }, [profileData.image]);

  const handleChangeFile = (event) => {
    setImageSource(URL.createObjectURL(event.target.files[0]))
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', imageFile?.current?.files[0]);
    if (imageFile?.current?.files[0]) {
      try {
        setIsLoaded(false)
        const { data } = await axiosReq.put(`profiles/${profile_id}/`, formData);
        setProfileData(data);
        setCurrentUser(prevState => ({
          ...prevState,
          "profile_image": data.image
        }));
        setSuccessFeedback("Profile picture successfully updated.")
        handleClose();
        URL.revokeObjectURL(imageSource);
        setIsLoaded(true)
      } catch (err) {
        setErrors(err.response?.data)
        setIsLoaded(true)
      }
    }
  };

  return (
    <>
      <i 
        onClick={handleShow} 
        className={`fa-solid fa-arrow-up-from-bracket fa-lg ${className}`}
      >
      </i>

      <Modal show={show} onHide={handleClose}>
      {!isLoaded && <LoadingIcon size="8" />}
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt="profile"
            src={imageSource}
          />
        </Figure>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            ref={imageFile}
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
          />
        </Form.Group>
        {errors?.image?.map((err_message, idx) => (
          <p className="mb-0" style={{ color:"red" }} key={idx}>{err_message}</p>
        ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="sm">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProfileImage;