import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

function AddCommentModal({ id, taskData }) {

  const [ show, setShow ] = useState(false);
  const [ commentContent, setcommentContent ] = useState({});
  const [ feedback, setFeedback ] = useState("");
  const handleShow = () => setShow(true);
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
    formData.append('content', commentContent)

    if (Object.keys(commentContent).length !== 0) {
      try {
        const { data } = await axios.post(`/comments/`, formData);
        setFeedback("");
      } catch (err) {
        console.log(err.response)
      }
    } else {
      setFeedback("You cannot submit a blank comment.")
    }
  }

  return (
    <>
      <Button variant="link" onClick={handleShow}>
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
                placeholder="Comment"
                maxLength={250}
                onChange={handleChange}
                aria-label="Add comment"
              />

              <Alert className={`mt-1 mb-0 pb-0 pt-0`} style={{ textAlign: "center"}} variant="danger">
                {feedback}
              </Alert>

            </Form.Group>
          </Form>

          <p className="m-0">Task: <span>{taskData.task_name}</span></p>
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
};

export default AddCommentModal;