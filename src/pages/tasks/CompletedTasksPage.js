import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import styles from '../../styles/CompletedTasksPage.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { getFilteredTasks } from '../../api/taskMethods';
import LoadingIcon from '../../components/LoadingIcon';

function CompletedTasksPage({ categories }) {

  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const getCompletedTasks = async () => {
      try {
        setIsLoaded(false);
        const { data } = await axiosReq.get(
          `/tasks/?progress=completed&ordering=-due_date`
        )
        setTasks(data);
        setIsLoaded(true);
      } catch (err) {
        setError("Sorry, an error has occurred. Please try refreshing the page.");
        setIsLoaded(true);
      }
    }
    getCompletedTasks();
  }, [])

  const handleFilterSubmit = async () => {
    setError("");
    getFilteredTasks({filters, setTasks, setError, completedTasksOnly: true, setIsLoaded });
  };

  return (
    <Col className={styles.CompletedTasksPage}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}
        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.PageTitle}`}>COMPLETED</h2>
        </div>

        <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          removeOrderByTime
          removeProgressField
        />

        <hr />
      
        <TasksList
          tasks={tasks}
          showCompletedTasksOnly
          showDate
        />
      </div>
    </Col>
  )
};

export default CompletedTasksPage;