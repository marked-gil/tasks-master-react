import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../../styles/MyTasksToday.module.css';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
import AddTask from './AddTask';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function MyTasksToday() {
  const currentUser = useCurrentUser();

  const [ tasks, setTasks ] = useState({ results: []})

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?due_date=${moment().format("yyyy-MM-DD")}&progress=&category=`
        );
        setTasks(data)
      } catch (err) {
        console.log(err.response?.data)
      }
    }

    handleMount();
  }, [currentUser])

  return (
    <Col className={styles.MyTasksToday}>
      <div className={styles.Container}>
        <div className={`d-flex justify-content-between ${styles.Title}`}>
          <h2 className={`${styles.MyTasks}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>Today <span className={`d-block ${styles.DateToday}`}>12 March 2023, Thursday</span></h2>
        </div>

        {/* Tasks Status Filter */}
        <Form>
          <div className="d-flex">
            <p className={`me-4 mb-0 ${styles.bold}`}>Show: </p>
            {['Completed', 'To-do', 'Overdue', 'Shared'].map((status) => (
              <div key={status} className="me-4" >
                <Form.Check 
                  type="checkbox"
                  id={status}
                  label={status}
                />
              </div>
            ))}
          </div>
          
          <div className="d-flex">
            {/* Category */}
            <p className={`me-3 mb-0 ${styles.bold}`}>Category: </p>
            <Form.Select size="sm" className={`me-3 ${styles.FormSelect}`} aria-label="Select category">
              {['All', 'At Home', 'At Work'].map((category) => (
                <option value={category} key={category}>{category}</option>
              ))}
            </Form.Select>
            
            {/* Ordering of Tasks */}
            <p className={`me-3 ${styles.bold}`}>Order by: </p>
            <Form.Select size="sm" className={`me-3 ${styles.FormSelect}`} aria-label="Order today's tasks">
              {['Due Time', 'Priority'].map((opt) => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </Form.Select>
          </div>
          <Button className={styles.FilterButton} variant="primary" size="sm">
            Filter
          </Button>
        </Form>
        <p className="align-self-start"><span className={styles.bold}>Filtered by:</span> to-do, all category | <span className={styles.bold}>Ordered by:</span> due time - ascending</p>
      
        <ListGroup className={styles.ListGroup}>
          {tasks.results.map((task) => (
            <div className="d-flex align-items-center mb-2" key={task.task_name}>
              <i className="fa-solid fa-grip-vertical fa-xl"></i>
              <ListGroup.Item
                className={`ms-2 me-1 ${styles.ListGroupItem}`} 
                action 
                variant="light" 
              >
                {task.task_name}
              </ListGroup.Item>
              <i className="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>              
          ))}
        </ListGroup>
      </div>

      <AddTask tasks={tasks} setTasks={setTasks} />

    </Col>
  )
}

export default MyTasksToday;