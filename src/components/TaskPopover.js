import React from 'react';
import { Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';

function TaskPopover({ children, task, setTasks }) {

  const history = useHistory();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.delete(`/tasks/${task.id}`)
      setTasks(prevState => (
        {results: prevState.results.filter(item => item.id !== task.id)}
      ))
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const handleView = () => {
    history.push(`/task/${task.id}`)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0">
        <Button onClick={handleView} className="me-1" size="sm">View</Button>
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