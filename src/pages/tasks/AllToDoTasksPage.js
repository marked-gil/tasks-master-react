import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import styles from '../../styles/AllToDoTasksPage.module.css';

function AllToDoTasksPage() {
  const [ error, setError ] = useState({});

  return (
    <Col className={styles.AllTodoTasks}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>ALL</h2>
        </div>

        <hr />
      </div>
    </Col>
  )
};

export default AllToDoTasksPage;