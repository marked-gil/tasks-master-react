import React, { useState } from 'react';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import styles from '../../styles/AllTasksPage.module.css';


function AllTasksPage() {

  const [ error, setError ] = useState({});


  return (
    <Col className={styles.AllTasks}>
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

export default AllTasksPage;