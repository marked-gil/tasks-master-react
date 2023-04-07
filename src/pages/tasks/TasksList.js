import React from 'react';
import TaskPopover from '../../components/TaskPopover';
import { ListGroup } from 'react-bootstrap';
import styles from '../../styles/TasksList.module.css';

function TasksList({tasks, setTasks, setChangeInTasks, showCompletedTasks}) {

  const TasksListItem = (task, completed) => (
    <div className="d-flex align-items-center mb-2" key={task.id}>
      <i className="fa-solid fa-grip-vertical fa-xl"></i>

      <ListGroup.Item
        className={`ms-2 me-1 ${styles.ListGroupItem} ${completed ? styles.Completed : ""}`} 
        action 
        variant="light"
      >
        {task.task_name}
      </ListGroup.Item>

      <TaskPopover task={task} setTasks={setTasks} setChangeInTasks={setChangeInTasks} >
        <div className={`p-2 ${styles.VerticalEllipsis}`}>
          <i className={`fa-solid fa-ellipsis-vertical fa-lg`}></i>
        </div>
      </TaskPopover>
    </div>
)

  return (
    <ListGroup className={styles.ListGroup}>
      {tasks.results.map((task) => (
        showCompletedTasks ? TasksListItem(task, task.is_completed)
        : !task.is_completed ? TasksListItem(task) : ""
      ))}
    </ListGroup>  )
};

export default TasksList;