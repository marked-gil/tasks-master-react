import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import styles from '../../styles/OverdueTasksPage.module.css';
import { getFilteredTasks } from '../../api/taskMethods';
import TasksFilter from '../../components/TasksFilter';
import { axiosReq } from '../../api/axiosDefaults';

function OverdueTasksPage({ categories }) {

  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});

  useEffect(() => {
    const getOverdueTasks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?progress=overdue`
        );
        setTasks(data);
      } catch (err) {
        console.log(err.response?.data)
        setError(err.response?.data)
      }
    } 
    getOverdueTasks();
  }, []);

  const handleFilterSubmit = async () => {
    console.log(filters)
    getFilteredTasks({filters, setTasks, setError, overdueTasksOnly: true});
  };

  return (
    <Col className={styles.OverdueTasks}>
    <div className={styles.InnerContainer}>
      {error?.data && <ErrorDisplay error={error} />}

      <div className={`d-flex justify-content-between`}>
        <h2 className={`${styles.Heading}`}>My Tasks</h2>
        <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
        <h2 className={`${styles.PageTitle}`}>OVERDUE</h2>
      </div>

      <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          removeProgressField
          removeOrderByTime
        />

      <hr />
      
      <TasksList
        tasks={tasks}
        showDate
      />
    </div>

  </Col>  )
};

export default OverdueTasksPage;