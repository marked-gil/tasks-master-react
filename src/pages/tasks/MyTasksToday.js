import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../../styles/MyTasksToday.module.css';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
import AddTask from './AddTask';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import TaskPopover from '../../components/TaskPopover';
import { getCategories } from '../../api/categoryMethods';

function MyTasksToday() {
  const currentUser = useCurrentUser();

  const [ tasks, setTasks ] = useState({ results: []})
  const [ categories, setCategories ] = useState({ results: []})
  const [ filters, setFilters ] = useState({})

  const { category_name, progress } = filters;

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?due_date=${moment().format("yyyy-MM-DD")}`
        );
        setTasks(data)
        console.log(data)
      } catch (err) {
        console.log(err.response?.data)
      }
    }

    handleMount();
  }, [currentUser])

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  const handleFilterSubmit = async (event) => {
    event.preventDefault();

    try {
      const status = progress === 'all' ? "" : progress
      const cat_name = category_name === 'all' ? "" : category_name

      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment().format("yyyy-MM-DD")}&progress=${status ? status : ""
        }&category=${cat_name ? cat_name : ""}`
      );

      setTasks(data)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <Col className={styles.MyTasksToday}>
      <div>
        <div className={`d-flex justify-content-between ${styles.Title}`}>
          <h2 className={`${styles.MyTasks}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>Today <span className={`d-block ${styles.DateToday}`}>12 March 2023, Thursday</span></h2>
        </div>

        {/* Tasks Status Filter */}
        <Form>
          <div className="d-flex">
            <p className={`me-4 mb-0 ${styles.bold}`}>Progress: </p>
            <Form.Select
              size="sm"
              className={`me-3 ms-2 ${styles.FormSelect}`}
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

            {/* {['Completed', 'Todo', 'Overdue', 'Shared'].map((status) => (
              <div key={status} className="me-4" >
                <Form.Check 
                  type="checkbox"
                  id={status}
                  label={status}
                  name="progress"
                  value={status.toLowerCase()}
                  onChange={handleFilterChange}
                />
              </div>
            ))} */}
          </div>
          
          <div className="d-flex">
            {/* Category */}
            <p className={`me-3 mb-0 ${styles.bold}`}>Category: </p>
            <Form.Select
              size="sm"
              className={`me-3 ${styles.FormSelect}`}
              aria-label="Select category"
              name="category_name"
              onChange={handleFilterChange}
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
            
            {/* Ordering of Tasks */}
            <p className={`me-3 ${styles.bold}`}>Order by: </p>
            <Form.Select size="sm" className={`me-3 ${styles.FormSelect}`} aria-label="Order today's tasks">
              {['Due Time', 'Priority'].map((opt) => (
                <option name="order_by" value={opt} key={opt}>{opt}</option>
              ))}
            </Form.Select>
          </div>
          <Button className={styles.FilterButton} variant="primary" size="sm" onClick={handleFilterSubmit}>
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
              <TaskPopover task={task} setTasks={setTasks} >
                <div className={`p-2 ${styles.VerticalEllipsis}`}>
                  <i className={`fa-solid fa-ellipsis-vertical fa-lg`}></i>
                </div>
              </TaskPopover>
            </div>              
          ))}
        </ListGroup>
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
        setCategories={setCategories}
      />

    </Col>
  )
}

export default MyTasksToday;