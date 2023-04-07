import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from '../styles/TasksFilter.module.css';

function TasksFilter(props) {

  const {
    setFilters, 
    categories, 
    handleFilterSubmit, 
    setShowCompletedTasks, 
    showCompletedTasks
  } = props;

  const handleFilterChange = (event) => {
    setFilters(prevState => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ))
  }

  const handleCompletedTasks = (event) => {
    setShowCompletedTasks(event.target.checked);
  }

  return (
    <>
      {/* Tasks Status Filter */}
      <Form className="d-flex flex-wrap justify-content-between">
        {/* PROGRESS */}
        <div className="d-flex">
          <p className={`me-3 mb-0 ${styles.bold}`}>Progress: </p>
          <Form.Select
            size="sm"
            className={`me-3 ${styles.FormSelect}`}
            aria-label="Select progress status"
            name="progress"
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            {['to-do', 'overdue', 'completed'].map((status) => (
              <option
                value={status}
                key={status}
              >
                {status}
              </option>
            ))}
          </Form.Select>
        </div>
          
        {/* ORDER BY */}
        <div className="d-flex">
          <p className={`me-3 ${styles.bold}`}>Order by: </p>
          <Form.Select 
            name="order_by" 
            className={styles.OrderByField}
            onChange={handleFilterChange}
            aria-label="Order today's tasks" 
            size="sm"
          >
            <option value="due_time">Due Time - Ascending</option>
            <option value="-due_time">Due Time - Descending</option>
            <option value="priority">Priority - Ascending</option>
            <option value="-priority">Priority - Descending</option>
          </Form.Select>
        </div>

        {/* CATEGORIES */}
        <div className="d-flex">
          <p className={`me-3 mb-0 ${styles.bold}`}>Category: </p>
          <Form.Select
            className={`me-3 ${styles.FormSelect}`}
            aria-label="Select category"
            name="category_name"
            onChange={handleFilterChange}
            size="sm"
          >
            <option value="all">All Categories</option>
            {categories.results.map((cat) => (
              <option
                value={cat.id}
                key={cat.category_name}
              >
                {cat.category_name}
              </option>
            ))}
          </Form.Select>
        </div>

        <Button className={styles.FilterButton} variant="primary" size="sm" onClick={handleFilterSubmit}>
            Filter
          </Button>
      </Form>

      {/* SHOW COMPLETED TASKS TOGGLE */}
      <Form.Check 
        type="checkbox"
        id="show_completed_tasks"
        label="Show Completed Tasks"
        name="show_completed_tasks"
        value={showCompletedTasks}
        onClick={handleCompletedTasks}
        className="mt-4"
      />

  </>
  )
};

export default TasksFilter;