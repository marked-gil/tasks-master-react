import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { axiosReq } from '../../api/axiosDefaults';

function ChangePasswordModal(props) {

  const { 
    show, 
    onHide,
    setFeedbackMessage,
    setChangePassModalShow,
    setIsLoaded
  } = props;

  const initialData = {new_password1: "", new_password2: ""}

  const [ fieldErrors, setFieldErrors ] = useState({});
  const [ newPassword, setNewPassword ] = useState(initialData);

  const handleChange = (event) => {
    setNewPassword(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoaded(false);
      const { data  }= await axiosReq.post('dj-rest-auth/password/change/', newPassword);
      setFeedbackMessage(data.detail);
      setChangePassModalShow(false);
      setFieldErrors({})
      setNewPassword(initialData)
      setIsLoaded(true);
    } catch (err) {
      setFieldErrors(err.response?.data)
      setIsLoaded(true);
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Provide your new password on the form below.</p>
        <Form className="d-flex flex-column ps-lg-4 pe-lg-4 ps-0 pe-0">
          <Form.Group className="mb-3" controlId="formNewPassword1">
            <Form.Label className="mb-1">New Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" name="new_password1" onChange={handleChange} />
            {fieldErrors?.new_password1?.map((error, idx) => <Alert key={idx} variant="danger" className="pt-1 pb-1 text-center">{error}</Alert>) }
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewPassword2">
            <Form.Label className="mb-1">Repeat New Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat (New Password)" name="new_password2" onChange={handleChange} />
            {fieldErrors?.new_password2?.map((error, idx) => <Alert key={idx} variant="danger" className="pt-1 pb-1 text-center">{error}</Alert>) }
          </Form.Group>

          <Button className="align-self-center" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=> {
          onHide()
          setFieldErrors({})
          setNewPassword(initialData)
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;