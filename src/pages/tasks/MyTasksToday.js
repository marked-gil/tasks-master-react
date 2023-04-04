import React from 'react';
import styles from '../../styles/MyTasksToday.module.css';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';

function MyTasksToday() {
  return (
    <Col className={styles.MyTasksToday}>
      <div className={styles.Container}>
        <div className={`d-flex justify-content-between ${styles.Title}`}>
          <h2 className={`${styles.MyTasks}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i class="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>Today <span className={`d-block ${styles.DateToday}`}>12 March 2023, Thursday</span></h2>
        </div>

        {/* Tasks Status Filter */}
        <Form>
          <div className="d-flex">
            <p className={`me-4 mb-0 ${styles.bold}`}>Show: </p>
            {['Completed', 'To-do', 'Overdue', 'Shared'].map((status) => (
              <div key={status} className="me-4">
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
                <option value={category}>{category}</option>
              ))}
            </Form.Select>
            
            {/* Ordering of Tasks */}
            <p className={`me-3 ${styles.bold}`}>Order by: </p>
            <Form.Select size="sm" className={`me-3 ${styles.FormSelect}`} aria-label="Order today's tasks">
              {['Due Time', 'Priority'].map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </Form.Select>
          </div>
          <Button className={styles.FilterButton} variant="primary" size="sm">
            Filter
          </Button>
        </Form>
        <p className="align-self-start"><span className={styles.bold}>Filtered by:</span> to-do, all category | <span className={styles.bold}>Ordered by:</span> due time - ascending</p>
      
        <ListGroup className={styles.ListGroup}>
          {['task 1', 'task 2', 'task 3', 'task 4'].map((task) => (
            <div className="d-flex align-items-center mb-2">
              <i class="fa-solid fa-grip-vertical fa-xl"></i>
              <ListGroup.Item className={`ms-2 me-1 ${styles.ListGroupItem}`} action variant="light">{task}</ListGroup.Item>
              <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>              
          ))}
        </ListGroup>
      </div>

      <a href="#"><i class="fa-solid fa-plus"></i> Add Task</a>
    </Col>
  )
}

export default MyTasksToday;