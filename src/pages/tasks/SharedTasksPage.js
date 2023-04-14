import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import styles from '../../styles/SharedTasksPage.module.css';
import { getFilteredTasks } from '../../api/taskMethods';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function SharedTasksPage({ categories }) {
  const currentUser = useCurrentUser();
  const id = currentUser?.pk

  const [ tasks, setTasks ] = useState({ results: []});
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});

  useEffect(() => {
    const getSharedTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?is_shared=true`);
        setTasks(data);
      } catch (err) {
        console.log(err.response?.data);
        setError(err.response)
      }
    }
    if (id) {
      getSharedTasks();
    }
  }, [id]);

  const handleFilterSubmit = async () => {
    getFilteredTasks({
      filters,
      setTasks,
      setError,
      sharedTasksOnly: true,
      user_id: id
    });
  };

  return (
    <Col className={styles.SharedTasksPage}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>SHARED</h2>
        </div>

        <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
          removeOrderByTime
        />

        <hr />
      
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          showCompletedTasks={true}
          showDate
          removeDoneButton
        />
      </div>

    </Col>
  )
};

export default SharedTasksPage;