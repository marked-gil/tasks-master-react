import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import TaskPopover from '../../components/TaskPopover';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from '../../styles/TasksList.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';


function TasksList(props) {

  const {
    tasks,
    showCompletedTasks,
    showCompletedTasksOnly,
    showDate,
    showTime,
    isLoaded,
    showOverdueTasksOnly,
    showAllTodosOnly,
    setError
  } = props;

  const local_timezone = moment.tz.guess(true)  
  const [ tasksList, setTasksList ] = useState({ results: [] });

  useEffect(() => {
    setTasksList(tasks);
  },[tasks])

  const taskDueTime = (due_date, due_time) => {
    const utcDateTime = `${due_date}T${due_time}`;
    const utcMoment = moment.utc(utcDateTime);
    const local_due_time = utcMoment.tz(local_timezone);
  
    return local_due_time.format('HH:mm')
  }

  const taskPriority = (task) => {
    return (
      task.priority === 1 ? "Low"
      : task.priority === 2 ? "Medium" 
      : "High"
    )
  }

  const renderIsSharedToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Shared
    </Tooltip>
  );

  const renderIsCompletedToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Completed
    </Tooltip>
  );

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

        {task.is_shared &&
          <OverlayTrigger
            placement="left"
            delay={{ show: 150, hide: 400 }}
            overlay={renderIsSharedToolTip}
          >
            <i className={`fa-solid fa-share-nodes ${styles.IsSharedIcon}`}></i>
          </OverlayTrigger>
        }
        {task.is_completed &&
          <OverlayTrigger
            placement="left"
            delay={{ show: 150, hide: 400 }}
            overlay={renderIsCompletedToolTip}
          > 
            <i className={`fa-solid fa-check-double ${styles.IsCompletedIcon}`}></i>
          </OverlayTrigger>
        }
      </ListGroup.Item>

      <TaskPopover 
        task={task}
        setTasksList={setTasksList}
        setError={setError}
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
        {!!showTime && task.due_time && taskDueTime(task.due_date, task.due_time)}
        {!!showTime && !task.due_time && <i className="fa-solid fa-minus"></i>}
        {!!showDate && task.due_date}

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
          ${task.progress === "completed" ? styles.CompletedLegend : "" }
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
    <ListGroup className={styles.ListGroup} id="scrollableContainer">
      {isLoaded ? (
        <>
          {tasksList.results.length ? 
            <>
              {showCompletedTasksOnly && 
                <InfiniteScroll 
                  scrollableTarget="scrollableContainer"
                  children={tasksList.results.map((task) => (
                      task.is_completed ? TasksListItem(task, task.is_completed) : ""
                  ))}
                  dataLength={tasksList.results.length}
                  loader={<Spinner animation="grow" variant="success" />}
                  hasMore={!!tasksList.next}
                  next={() => fetchMoreData(tasksList, setTasksList)}
                />
              }
              {!showCompletedTasksOnly && 
                <InfiniteScroll 
                  scrollableTarget="scrollableContainer"
                  children={tasksList.results.map((task) => (
                    showCompletedTasks ? TasksListItem(task, task.is_completed)
                    : !task.is_completed ? TasksListItem(task) : ""
                  ))}
                  dataLength={tasksList.results.length}
                  loader={<Spinner animation="grow" variant="success" />}
                  hasMore={!!tasksList.next}
                  next={() => fetchMoreData(tasksList, setTasksList)}
                />
              }
              {!showCompletedTasksOnly && !showCompletedTasks && 
                !showOverdueTasksOnly && !showAllTodosOnly &&
                <p className="text-center mb-0">Use filter to show completed tasks.</p>}
            </> 
            : <p className="text-center mt-3">No tasks here.</p>
          }      
        </>
      ) : ""
    }
    </ListGroup>
  )
}

export default TasksList;