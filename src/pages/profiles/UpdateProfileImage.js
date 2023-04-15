import React, { useEffect, useRef, useState } from 'react';
import { Button, Figure, Form, Modal } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

function UpdateProfileImage({ profile_id, profileData, setProfileData, className }) {
  
  const [ imageSource, setImageSource ] = useState("");
  const [show, setShow] = useState(false);
  const imageFile = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setImageSource(profileData.image);
  }, [profileData.image]);

  const handleChangeFile = (event) => {
    setImageSource(URL.createObjectURL(event.target.files[0]))
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('first_name', profileData.first_name);
    formData.append('last_name', profileData.last_name);
    formData.append('email', profileData.email);
    formData.append('image', imageFile?.current?.files[0]);

    try {
      console.log(formData)
      const { data } = await axiosReq.patch(`profiles/${profile_id}`, formData);
      setProfileData(data);
      console.log(data)
      URL.revokeObjectURL(imageSource);
      handleClose();
    } catch (err) {
      console.log(err)
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
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Image</Modal.Title>
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
            // name="image"
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
          />
        </Form.Group>
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