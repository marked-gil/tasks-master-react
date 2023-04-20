import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

function CommentCard({ comment, setComments }) {

  const [ commentChanged, setCommentChanged ] = useState(false);
  const [ editComment, setEditComment ] = useState({});

  const handleChange = (event) => {
    setEditComment(() => (
      {[event.target.name]: event.target.value}
      )
    )
  }

  const handleCancel = async() => {
    setEditComment({});
    setCommentChanged(false);
  }

  const handleSaveEdit = async() => {
    const formData = new FormData();
    formData.append('reply_to', "")
    formData.append('task', comment.task)
    formData.append('content', editComment.content)
    try {
      const { data } = await axiosReq.put(`/comments/${comment.id}`, formData)
      console.log(data)
      handleCancel();
    } catch (err) {
      console.log(err.response)
    }
  }

  const handleDelete = async() => {
    try {
      await axiosRes.delete(`/comments/${comment.id}`)
      setComments(prevState => (
        {results: prevState.results.filter(item => item.id !== comment.id)}
      ))
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <Card className="mb-1">
      <Card.Title>{comment.owner}</Card.Title>
      <Card.Subtitle>{comment.datetime_created}</Card.Subtitle>
        <Card.Body className="pt-1 pb-1">
          <Form.Control 
            plaintext 
            readOnly={!commentChanged} 
            defaultValue={comment.content}
            name="content"
            onChange={handleChange}
          />
        </Card.Body>
      <div className="d-flex justify-content-end gap-2 mb-1">
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
        {!commentChanged &&
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
};

export default CommentCard;