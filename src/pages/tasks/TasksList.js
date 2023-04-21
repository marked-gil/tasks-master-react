import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TaskPopover from '../../components/TaskPopover';
import { ListGroup } from 'react-bootstrap';
import styles from '../../styles/TasksList.module.css';

function TasksList(props) {

  const {
    tasks,
    showCompletedTasks,
    showCompletedTasksOnly,
    showDate,
    showTime,
  } = props;

  const [ tasksList, setTasksList ] = useState({results: []});

  useEffect(() => {
    setTasksList(tasks)
  },[tasks])

  const taskPriority = (task) => {
    return (
      task.priority === 1 ? "Low"
      : task.priority === 2 ? "Medium" 
      : "High"
    )
  }

  const TasksListItem = (task, completed) => (
    <div className={styles.TaskContainer} key={task.id}>
      <i className={`fa-solid fa-grip-vertical fa-xl ${styles.GripIcon}`}></i>

      <ListGroup.Item
        className={`
          ${styles.ListGroupItem} 
          ${completed ? styles.Completed : ""}
          ${task.progress === "overdue" ? styles.OverdueTask : ""}
        `} 
        action 
      >
        {task.task_name}
      </ListGroup.Item>

      <TaskPopover 
        task={task}
        setTasksList={setTasksList}
      >
        <div className={`p-2 ${styles.VerticalEllipsis}`}>
          <i className={`fa-solid fa-ellipsis-vertical fa-lg`}></i>
        </div>
      </TaskPopover>

      {/* DUE DATE OR TIME */}
      <p className={
          `ms-auto mb-0 
          ${styles.DateTime} 
          ${styles.DateTimeContainer}`
        }
      >
        {!!showTime && task.due_time}
        {!!showTime && !task.due_time && <i className="fa-solid fa-minus"></i>}
        {!!showDate && moment(task.due_date).format("DD MMM YYYY")}
      </p>
      {/* LEGEND */}
      <p className={
          `mb-0
          ${styles.Legend}
          ${!!showTime && styles.LegendForTime}`
        }
      >
        <span className={styles.LegendCategory}>{task.category}</span> 
        <span className={styles.FirstSeparator}>|</span> 
        <span className={`
          ${styles.LegendProgress}
          ${task.progress === "overdue" ? styles.OverdueLegend : ""}
        `}>
          {task.progress}
        </span> | 
        <span className={`
          ${styles.LegendPriority}
          ${taskPriority(task) === "High" ? styles.High : 
            taskPriority(task) === "Medium" ? styles.Medium : ""
          }
        `}>{taskPriority(task)}
        </span>
      </p>
    </div>
)

  return (
    <ListGroup className={styles.ListGroup}>
      {showCompletedTasksOnly && 
        tasksList.results.map((task) => (
          task.is_completed ? TasksListItem(task, task.is_completed) : ""
        ))
      }
      {!showCompletedTasksOnly && tasksList.results.map((task) => (
        showCompletedTasks ? TasksListItem(task, task.is_completed)
        : !task.is_completed ? TasksListItem(task) : ""
      ))}
    </ListGroup>
  )    
};

export default TasksList;