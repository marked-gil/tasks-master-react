import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../../styles/TasksTodayPage.module.css';
import { Col, ListGroup } from 'react-bootstrap';
import AddTask from './AddTask';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import TaskPopover from '../../components/TaskPopover';
import { getCategories } from '../../api/categoryMethods';
import { getTasksToday } from '../../api/taskMethods';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';

function TasksTodayPage() {
  const currentUser = useCurrentUser();

  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: []});
  const [ filters, setFilters ] = useState({});
  const [ error, setError ] = useState({});

  const { category_name, progress, order_by } = filters;

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    getTasksToday(setTasks);
  }, [currentUser, changeInTasks])

  const handleFilterSubmit = async (event) => {
    event.preventDefault();

    try {
      const status = progress === 'all' ? "" : progress
      const cat_name = category_name === 'all' ? "" : category_name
      
      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment().format("yyyy-MM-DD")}&progress=${status ? status : ""
        }&category=${cat_name ? cat_name : ""}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data)
    } catch (err) {
      console.log(err.response)
      setError(err.response)
    }
  }

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
    <Col className={styles.MyTasksToday}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.MyTasks}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>Today <span className={`d-block ${styles.DateToday}`}>{moment().format("D MMMM YYYY, dddd")}</span></h2>
        </div>

        <TasksFilter
          setFilters={setFilters}
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
        />
        
        <hr />

        <ListGroup className={styles.ListGroup}>
          {tasks.results.map((task) => (
            showCompletedTasks ? TasksListItem(task, task.is_completed)
            : !task.is_completed ? TasksListItem(task) : ""
          ))}
        </ListGroup>
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
        setCategories={setCategories}
      />

    </Col>
  )
}

export default TasksTodayPage;