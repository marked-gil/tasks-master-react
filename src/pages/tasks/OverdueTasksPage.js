import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import styles from '../../styles/OverdueTasksPage.module.css';
import { axiosReq } from '../../api/axiosDefaults';

function OverdueTasksPage() {

  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ tasks, setTasks ] = useState({ results: []});
  const [ error, setError ] = useState({});

  useEffect(() => {
    const getOverdueTasks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?progress=overdue`
        );
        setTasks(data);
        console.log(data)
      } catch (err) {
        console.log(err.response?.data)
        setError(err.response?.data)
      }
    }

    getOverdueTasks();
  }, [changeInTasks])


  return (
    <Col className={styles.OverdueTasks}>
    <div className={styles.InnerContainer}>
      {error?.data && <ErrorDisplay error={error} />}

      <div className={`d-flex justify-content-between`}>
        <h2 className={`${styles.Heading}`}>My Tasks</h2>
        <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
        <h2 className={`${styles.Heading}`}>OVERDUE</h2>
      </div>

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