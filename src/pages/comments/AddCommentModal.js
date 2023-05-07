import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/AddCommentModal.module.css';
import { axiosRes } from '../../api/axiosDefaults';

// Component for adding new comments
function AddCommentModal(props) {

  const { 
    taskData, 
    setComments, 
    setError, 
    setFeedbackMessage
  } = props;

  const [ show, setShow ] = useState(false);
  const [ commentContent, setcommentContent ] = useState({});
  const [ feedback, setFeedback ] = useState("");
  
  const handleShow = () => {
    setShow(true);
    setError("");
    setFeedbackMessage("");
  };

  const handleClose = () => {
    setShow(false);
    setcommentContent({});
    setFeedback("");
  };

  const handleChange = (event) => {
    setcommentContent(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleCommentPost = async() => {
    const formData = new FormData();
    formData.append("task", taskData.task_name)
    formData.append('reply_to', "")
    formData.append('content', commentContent.content)

    if (Object.keys(commentContent).length !== 0) {
      try {
        const { data } = await axiosRes.post(`/comments/`, formData);
        setComments(prevState => ({ 
          results: [data, ...prevState.results]
        }))
        setFeedback("");
        handleClose();
      } catch (err) {
        setError("Sorry, an ERROR has occurred when posting your comment.");
        handleClose();
      }
    } else {
      setFeedback("You cannot submit a blank comment.")
    }
  }

  return (
    <>
      <Button variant="link" onClick={handleShow} className={styles.AddCommentButton}>
        Add comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Control
                as="textarea" 
                rows={3} 
                name="content"
                placeholder="Write your comment here."
                maxLength={250}
                onChange={handleChange}
                aria-label="Add comment"
              />

              {feedback && 
                <Alert className={`mt-1 mb-0 pb-0 pt-0`} style={{textAlign: "center"}} variant="danger">
                  {feedback}
                </Alert>
              }
            </Form.Group>
          </Form>
          <p className="m-0"><span className={styles.LabelTask}>Task: </span><span className={styles.bold}>{taskData.task_name}</span></p>
        </Modal.Body>
        <Modal.Footer className="pb-0 pt-0">
          <Button variant="secondary" onClick={handleClose} size="sm">
            cancel
          </Button>
          <Button variant="primary" onClick={handleCommentPost}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCommentModal;