import React, { useEffect, useMemo, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import styles from '../../styles/AllToDoTasksPage.module.css';
import TasksList from './TasksList';
import { getTodoTasks } from '../../api/taskMethods';

function AllToDoTasksPage() {

  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ tasks, setTasks ] = useState({ results: []});
  const [ error, setError ] = useState({});

  useEffect(() => {
    getTodoTasks(setTasks,setError)
  }, [changeInTasks]);

  return (
    <Col className={styles.AllTodoTasks}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>ALL TO-DOs</h2>
        </div>

        <hr />
        
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showDate
        />
      </div>
    </Col>
  )
};

export default AllToDoTasksPage;