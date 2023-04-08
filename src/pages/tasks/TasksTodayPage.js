import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import moment from 'moment';
import styles from '../../styles/TasksTodayPage.module.css';
import Col from 'react-bootstrap/Col';
import AddTask from './AddTask';
import { getCategories } from '../../api/categoryMethods';
import { getTasks } from '../../api/taskMethods';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';

function TasksTodayPage() {

  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: []});
  const [ error, setError ] = useState({});
  const [ filters, setFilters ] = useState({});
  const { category_name, progress, order_by } = filters;


  useEffect(() => {
    getCategories(setCategories);
  }, [changeInTasks]);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();

    try {
      const status = progress === 'all' ? "" : progress
      const cat_name = category_name === 'all' ? "" : category_name
      
      console.log(progress, category_name)
      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment().format("yyyy-MM-DD")}&progress=${status ? status : ""
        }&category=${cat_name ? cat_name : ""}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data);
      console.log("reached",data)
    } catch (err) {
      console.log(err.response)
      setError(err.response);
    }
  }

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
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
        />
        
        <hr />

        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showCompletedTasks={showCompletedTasks}
        />

      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
      />

    </Col>
  )
}

export default TasksTodayPage;