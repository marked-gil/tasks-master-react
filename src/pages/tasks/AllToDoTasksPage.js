import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import styles from '../../styles/AllToDoTasksPage.module.css';
import TasksList from './TasksList';
import { getFilteredTasks, getTodoTasks } from '../../api/taskMethods';
import AddTask from './AddTask';
import TasksFilter from '../../components/TasksFilter';

function AllToDoTasksPage({ categories }) {

  const [ changeInTasks, setChangeInTasks ] = useState({});
  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});

  useEffect(() => {
    getTodoTasks(setTasks, setError)
  }, [changeInTasks]);

  const handleFilterSubmit = async () => {
    getFilteredTasks({filters, setTasks, setError, todoTasksOnly:true});
  };

  return (
    <Col className={styles.AllTodoTasks}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>ALL TO-DOs</h2>
        </div>

        <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          removeProgressField
          removeOrderByTime
        />

        <hr />
        
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showDate
        />
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
      />
    </Col>
  )
};

export default AllToDoTasksPage;