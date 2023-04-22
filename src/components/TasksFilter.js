import React from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import styles from '../styles/TasksFilter.module.css';

function TasksFilter(props) {

  const {
    setFilters,
    categories, 
    setShowCompletedTasks, 
    showCompletedTasks,
    handleFilterSubmit,
    removeCategoryField,
    removeProgressField,
    removeOrderByTime,
    removeOrderByDate,
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
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filter Your Tasks</Accordion.Header>
        <Accordion.Body>
          <Form className={styles.Form}>
            {/* PROGRESS */}
            {!removeProgressField && 
              <div className="d-flex gap-2">
                <p className={`mb-0 ${styles.bold}`}>Progress: </p>
                <Form.Select
                  size="sm"
                  className={`${styles.FormSelect}`}
                  aria-label="Select progress status"
                  name="progress"
                  onChange={handleFilterChange}
                >
                  <option value="">All Statuses</option>
                  <option value="to-do">To-do</option>
                  <option value="overdue">Overdue</option>
                </Form.Select>
              </div>
            }
              
            {/* ORDER BY */}
            <div className="d-flex gap-2">
              <p className={`mb-0 ${styles.bold}`}>Order by: </p>
              <Form.Select 
                name="order_by" 
                className={styles.OrderByField}
                onChange={handleFilterChange}
                aria-label="Order today's tasks" 
                size="sm"
              >
                {!removeOrderByTime && <option value="due_time">Due Time - Ascending</option>}
                {!removeOrderByTime && <option value="-due_time">Due Time - Descending</option>}
                {!removeOrderByDate && <option value="due_date">Due Date - Ascending</option>}
                {!removeOrderByDate && <option value="-due_date">Due Date - Descending</option>}
                <option value="priority">Priority - Ascending</option>
                <option value="-priority">Priority - Descending</option>
              </Form.Select>
            </div>

            {/* CATEGORIES */}
            {!removeCategoryField && <div className="d-flex gap-2">
              <p className={`mb-0 ${styles.bold}`}>Category: </p>
              <Form.Select
                className={`${styles.FormSelect}`}
                aria-label="Select category"
                name="category_name"
                onChange={handleFilterChange}
                size="sm"
              >
                <option value="">All Categories</option>
                {categories.results.map((cat) => (
                  <option
                    value={cat.id}
                    key={cat.category_name}
                  >
                    {cat.category_name}
                  </option>
                ))}
              </Form.Select>
            </div>}
            
            <Button
              className={`${styles.FilterButton} ${(removeCategoryField || removeProgressField) && "flex-fill"}`}
              variant="primary"
              size="sm"
              onClick={handleFilterSubmit}
            >
              Filter
            </Button>
          </Form>

          {/* SHOW COMPLETED TASKS TOGGLE */}
          {setShowCompletedTasks &&
            <Form.Check 
              type="checkbox"
              id="show_completed_tasks"
              label="Show Completed Tasks"
              name="show_completed_tasks"
              value={showCompletedTasks}
              onClick={handleCompletedTasks}
              className="mt-4"
            />
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
};

export default TasksFilter;