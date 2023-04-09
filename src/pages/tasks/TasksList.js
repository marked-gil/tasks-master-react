import React from 'react';
import TaskPopover from '../../components/TaskPopover';
import { ListGroup } from 'react-bootstrap';
import styles from '../../styles/TasksList.module.css';

function TasksList(props) {

  const {
    tasks,
    setTasks,
    setChangeInTasks,
    showCompletedTasks,
    showDate,
    showTime,
  } = props;

  const taskPriority = (task) => {
    return (
      task.priority === 1 ? "Low"
      : task.priority === 2 ? "Medium" 
      : "High"
    )
  }

  const TasksListItem = (task, completed) => (
    <div className="d-flex align-items-center mb-2 position-relative" key={task.id}>
      <i className="fa-solid fa-grip-vertical fa-xl"></i>

      <ListGroup.Item
        className={`ms-2 me-1 ${styles.ListGroupItem} ${completed ? styles.Completed : ""}`} 
        action 
        variant="light"
      >
        {/* {task.task_name} */}
        {task}
      </ListGroup.Item>

      <TaskPopover task={task} setTasks={setTasks} setChangeInTasks={setChangeInTasks}>
        <div className={`p-2 ${styles.VerticalEllipsis}`}>
          <i className={`fa-solid fa-ellipsis-vertical fa-lg`}></i>
        </div>
      </TaskPopover>

      {/* DUE DATE OR TIME */}
      <p className="ms-auto mb-0">
        { !!showTime && task.due_time }
        {!task.due_time && <i className="me-3 fa-solid fa-minus"></i>}
        {!!showDate && task.due_date}
      </p>
      {/* LEGEND */}
      <p className={`position-absolute mb-0 ps-1 pe-1 ${styles.Legend}`}>
        {task.category} | {task.progress} | {taskPriority(task)}
      </p>
    </div>
)

  return (
    <ListGroup className={styles.ListGroup}>
      {tasks.results.map((task) => (
        showCompletedTasks ? TasksListItem(task, task.is_completed)
        : !task.is_completed ? TasksListItem(task) : ""
      ))}
    </ListGroup>

    // <ListGroup className={styles.ListGroup}>
    //   {['Task 1 Task 1 Task 1 Task 1 Task 1 Task 1 Task 1 Task 1 Task 1', 'Task 2', 'Task 3'].map((task) => (
    //     showCompletedTasks ? TasksListItem(task, task.is_completed)
    //     : !task.is_completed ? TasksListItem(task) : ""
    //   ))}
    // </ListGroup>
  )    
};

export default TasksList;