import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { axiosReq } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { deleteTask } from '../api/taskMethods';

function TaskPopover({ children, task, setTasks, setChangeInTasks }) {

  const history = useHistory();

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
      setChangeInTasks(data)
      setTasks(prevState => ({
        ...prevState,
        results: [data]
      }))
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const handleDelete = () => {
    deleteTask(task, setTasks);
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