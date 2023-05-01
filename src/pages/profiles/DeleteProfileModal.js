import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function DeleteProfileModal(props) {

  const { 
    show, 
    onHide,
    profile_id,
    setIsLoaded,
    setError,
    setShowDeleteModal
   } = props;

   const history = useHistory();

  const handleClose = () => {
    setShowDeleteModal(false);
  }

  const handleDeleteProfile = async() => {
    setIsLoaded(false);
    try {
      await axiosRes.delete(`/profiles/${profile_id}`);
      setTimeout(() => {
        handleClose();
        setIsLoaded(true);
        history.push("/signin");
      }, 1500);
    } catch (err) {
      handleClose();
      setIsLoaded(true);
      setError("An error has occurred while deleting the profile. Try again later.")
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="delete-profile-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="delete-profile-modal">
          Confirm to Delete        
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete your profile? There'll be no turning back once it's done.
        </p>
        <div className="text-center">
          <Button variant="danger" onClick={handleDeleteProfile}>Yes, Delete Profile Now!</Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteProfileModal;