import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TaskPopover from '../../components/TaskPopover';
import { ListGroup } from 'react-bootstrap';
import styles from '../../styles/TasksList.module.css';
import { axiosReq } from '../../api/axiosDefaults';

function TasksList(props) {

  const {
    tasks,
    showCompletedTasks,
    showCompletedTasksOnly,
    showDate,
    showTime,
    isLoaded
  } = props;

  const dateToday = moment().format("YYYY-MM-DD");
  const [ tasksList, setTasksList ] = useState({results: []});

  useEffect(() => {
    const updateOverdueTasks = async () => {
      for (let task of tasks.results) {
        if (task.progress !== 'completed' && task.progress !== 'overdue')
          if (task.due_date === dateToday) {
            if (task.due_time < moment().format("HH:MM")) {
              try {
                await axiosReq.put(`tasks/${task.id}`, {...task, 'progress': 'overdue'})
              } catch (err) {
                console.log(err)
              }
            }
          } else if (task.due_date < dateToday) {
            try {
              await axiosReq.put(`tasks/${task.id}`, {...task, 'progress': 'overdue'})
            } catch (err) {
              console.log(err.response)
            }
          }
      }
    }
    updateOverdueTasks();
    setTasksList(tasks);
  },[tasks, dateToday])

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
        href={`/task/${task.id}`}
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

      {isLoaded ? (
        <>
          {tasksList.results.length ? 
            <>
              {showCompletedTasksOnly && 
              tasksList.results.map((task) => (
                task.is_completed ? TasksListItem(task, task.is_completed) : ""
              ))
              }
              {!showCompletedTasksOnly && tasksList.results.map((task) => (
                showCompletedTasks ? TasksListItem(task, task.is_completed)
                : !task.is_completed ? TasksListItem(task) : ""
              ))}
            </> 
            : <p className="text-center mt-3">No tasks here.</p>
          }      
        </>
      ) : ""
    }
    </ListGroup>
  )    
};

export default TasksList;