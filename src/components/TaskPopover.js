import React from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function TaskPopover(props) {
  
  const { 
    children, 
    task, 
    setTasksList,
    setError
  } = props;

  const history = useHistory();

  const handleView = () => {
    history.push(`/task/${task.id}`)
  }

  const handleComplete = () => {
    const taskData = {
      ...task,
      "due_date": moment(new Date(task.due_date)).format("yyyy-MM-DD"),
      "is_completed": true
    }

    const updateTasks = async () => {
      try {
        const { data } = await axiosReq.put(`/tasks/${task.id}`, taskData);
        setTasksList(prevState => ({
          results: [...prevState.results.filter(item => item.id !== task.id), data]
        }))
      } catch (err) {
        setError("Sorry, an error has occurred while updating the task.")
      }
    }
    updateTasks();
  };

  const handleUndo = async () => {
    try {
      const { data } = await axiosReq.put(`/tasks/${task.id}`, {
        ...task, "datetime_completed": null, "is_completed": false});
        setTasksList(prevState => ({
        results: [...prevState.results.filter(item => item.id !== task.id), data]
      }))
    } catch (err) {
      setError("Sorry, an error has occurred while updating the task.")
    }
  }

  const handleDelete = () => {
    const deleteTask = async () => {
      let task_id = ""
      if (typeof task === 'object') {
        task_id = task.id
      } else if (typeof task === 'string') {
        task_id = task
      }
    
      try {
        await axiosRes.delete(`/tasks/${task_id}`);
        if (setTasksList) {
          setTasksList(prevState => (
            {results: prevState.results.filter(item => item.id !== task.id)}
          ))
        }
      } catch (err) {
        setError("Sorry, an error has occurred while deleting the task.")
      }
    }

    deleteTask();
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0">
        {task.is_owner && <Button onClick={handleDelete} className="me-1" variant="danger" size="sm">Delete</Button>}
        <Button onClick={handleView} className="me-1" size="sm">View</Button>
        {task.is_owner && !task.is_completed && <Button onClick={handleComplete} size="sm">Done</Button>}
        {task.is_owner && task.is_completed && <Button onClick={handleUndo} size="sm">Undo</Button>}
      </Popover.Body>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" rootClose rootCloseEvent="click" placement="left" overlay={popover}>
      { children }
    </OverlayTrigger>
  )
}

export default TaskPopover;