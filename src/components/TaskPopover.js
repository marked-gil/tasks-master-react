import React from 'react';
import { Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { axiosRes } from '../api/axiosDefaults';

function TaskPopover({ children, task }) {

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.delete(`/tasks/${task.id}`)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0">
        <Button className="me-1" size="sm">Edit</Button>
        <Button onClick={handleDelete} variant="danger" size="sm">Delete</Button>
      </Popover.Body>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
      { children }
    </OverlayTrigger>
  )
}

export default TaskPopover;