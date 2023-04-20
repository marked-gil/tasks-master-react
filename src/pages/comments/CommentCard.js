import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';

function CommentCard({ comment, setComments }) {

  const handleDelete = async() => {
    try {
      await axiosRes.delete(`/comments/${comment.id}`)
      setComments(prevState => (
        {results: prevState.results.filter(item => item.id !== comment.id)}
      ))
      console.log('comment deleted!')
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <Card key={comment.id} className="mb-1">
      <Card.Title>{comment.owner}</Card.Title>
      <Card.Subtitle>{comment.datetime_created}</Card.Subtitle>
      <Card.Body className="pt-1 pb-1">{comment.content}</Card.Body>
      <div className="d-flex justify-content-end gap-2 mb-1">
        <Button size="sm" className="pt-0 pb-0 ps-2 pe-2">Edit</Button>
        <Button 
          variant="danger" 
          size="sm" 
          className="pt-0 pb-0 ps-2 pe-2"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Card>
  )
};

export default CommentCard;