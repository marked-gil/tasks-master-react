import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CommentCard.module.css';
import moment from 'moment';

function CommentCard(props) {

  const { 
    comment, 
    setComments, 
    setError, 
  } = props;

  const [ commentChanged, setCommentChanged ] = useState(false);
  const [ editComment, setEditComment ] = useState(comment);
  const [ feedback, setFeedback ] = useState("");

  const handleChange = (event) => {
    setEditComment(() => ({[event.target.name]: event.target.value})
    )
  };

  const handleCancel = async() => {
    setEditComment(comment);
    setCommentChanged(false);
    setError("");
    setFeedback("");
  };

  const handleSaveEdit = async() => {
    setError("");
    setFeedback("");
    const formData = new FormData();
    formData.append('reply_to', "")
    formData.append('task', comment.task)
    formData.append('content', editComment.content)
  
    if (editComment.content) {
      try {
        await axiosReq.put(`/comments/${comment.id}`, formData);
        setCommentChanged(false);
      } catch (err) {
        setError("Sorry, an ERROR occured when posting the comment.");
      }
    } else {
      setFeedback("Empty comment is not allowed.");
    }
  };

  const handleDelete = async() => {
    setError("");
    try {
      await axiosRes.delete(`/comments/${comment.id}`);
      setComments(prevState => (
        {results: prevState.results.filter(item => item.id !== comment.id)}
      ));
    } catch (err) {
      setError("Sorry, an ERROR occurred when deleting the comment.")
    }
  };

  return (
    <Card className={`mb-1 pt-1 ${styles.CommentCard}`}>
      <div className="ps-1 d-flex align-items-center gap-2">
        <Card.Img src={comment.profile_image} style={{ width:"40px"}}></Card.Img>
        <Card.Title className={styles.Username}>{comment.owner}</Card.Title>
        <i className="fa-solid fa-ellipsis-vertical fa-xs"></i>
        <Card.Subtitle className="p-0 m-0">
          {moment(comment.datetime_created, "DD MMM YYYY | HH:mm").fromNow()}
        </Card.Subtitle>
      </div>
        <Card.Body className={`pt-1 pb-1`}>
          {!commentChanged && editComment.content}
          {commentChanged && 
            <Form.Control
              as="textarea"
              rows={4}
              disabled={!commentChanged}
              plaintext
              maxLength={250}
              readOnly={!commentChanged}
              value={editComment.content}
              name="content"
              onChange={handleChange}
              className={`${styles.CommentForm} ${commentChanged && styles.FormActive}`}
            />
          }
        </Card.Body>
      <div className="d-flex justify-content-end gap-2 mb-1 pe-1">
        <p className={styles.Feedback}>{feedback}</p>
        {commentChanged &&
          <>
            <Button 
              variant="secondary"
              size="sm" 
              className="pt-0 pb-0 ps-1 pe-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="pt-0 pb-0 ps-2 pe-2"
              onClick={handleSaveEdit}
            >
              Save
            </Button>
          </>
        }
        {comment.is_owner && !commentChanged &&
          <>
            <Button 
              size="sm" 
              className="pt-0 pb-0 ps-2 pe-2"
              onClick={setCommentChanged}
            >
              Edit
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              className="pt-0 pb-0 ps-2 pe-2"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        }
      </div>
    </Card>
  )
}

export default CommentCard;