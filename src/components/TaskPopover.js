import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';

function TaskPopover({ children, task, setTasks, setChangeInTasks }) {

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

  const handleComplete = async (event) => {
    event.preventDefault();
    
    const taskData = {
      ...task,
      "due_date": moment(new Date(task.due_date)).format("yyyy-MM-DD"),
      "is_completed": true
    }

    try {
      const { data } = await axiosReq.put(`/tasks/${task.id}`, taskData);
      console.log(data)
      setChangeInTasks(data)
      setTasks(prevState => ({
        ...prevState,
        data
      }))
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0">
        <Button onClick={handleDelete} className="me-1" variant="danger" size="sm">Delete</Button>
        <Button onClick={handleView} className="me-1" size="sm">View</Button>
        <Button onClick={handleComplete} size="sm">Done</Button>
      </Popover.Body>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover}>
      { children }
    </OverlayTrigger>
  )
}

export default TaskPopover;