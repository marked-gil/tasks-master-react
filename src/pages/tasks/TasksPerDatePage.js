import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getCategories } from '../../api/categoryMethods';
import { getTasks } from '../../api/taskMethods';
import { axiosReq } from '../../api/axiosDefaults';
import { Col } from 'react-bootstrap';
import styles from '../../styles/TasksPerDatePage.module.css';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import AddTask from './AddTask';

function TasksPerDatePage() {

  const dateTomorrow = moment().add(1, 'days');
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
    getTasks(setTasks, dateTomorrow);
  }, [changeInTasks, dateTomorrow]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();

    try {
      const status = progress === 'all' ? "" : progress
      const cat_name = category_name === 'all' ? "" : category_name
      
      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment(dateTomorrow).format("yyyy-MM-DD")}&progress=${status ? status : ""
        }&category=${cat_name ? cat_name : ""}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data)
    } catch (err) {
      console.log(err.response)
      setError(err.response)
    }
  }

  return (
    <Col className={styles.MyTasks}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>Today <span className={`d-block ${styles.Date}`}>{moment(dateTomorrow).format("D MMMM YYYY, dddd")}</span></h2>
        </div>

        <TasksFilter
          setFilters={setFilters}
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
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
        setCategories={setCategories}
      />
    </Col>
  )
}

export default TasksPerDatePage;