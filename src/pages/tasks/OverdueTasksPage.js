import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import styles from '../../styles/OverdueTasksPage.module.css';
import { getFilteredTasks, getOverdueTasks } from '../../api/taskMethods';
import TasksFilter from '../../components/TasksFilter';

function OverdueTasksPage({ categories }) {

  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});

  useEffect(() => {
    getOverdueTasks(setTasks, setError);
  }, [changeInTasks]);

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
        <h2 className={`${styles.Heading}`}>OVERDUE</h2>
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
        setTasks={setTasks}
        setChangeInTasks={setChangeInTasks}
        showDate
      />
    </div>

  </Col>  )
};

export default OverdueTasksPage;