import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import AddTask from './AddTask';
import styles from '../../styles/CompletedTasksPage.module.css';
import { getFilteredTasks, getTasksByCategory } from '../../api/taskMethods';
import { getCategory } from '../../api/categoryMethods';
import { axiosReq } from '../../api/axiosDefaults';

function CompletedTasksPage({ categories }) {

  const [ categoryData, setCategoryData ] = useState({});
  const [ changeInTasks, setChangeInTasks ] = useState({});
  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});

  useEffect(() => {
    const getCompletedTasks = async () => {
      try {

        const { data } = await axiosReq.get(
          `/tasks/?progress=completed`
        )
        setTasks(data)
      } catch (err) {
        console.log(err.response)
        setError(err.response)
      }
    }

    getCompletedTasks();
  }, [])

  const handleFilterSubmit = async () => {
    console.log(filters)
    getFilteredTasks({filters, setTasks, setError, category: categoryData.id});
  };

  return (
    <Col className={styles.CompletedTasksPage}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>COMPLETED</h2>
        </div>

        <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          removeCategoryField
          removeOrderByTime
        />

        <hr />
      
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showCompletedTasks={true}
          showDate
        />
      </div>

    </Col>
  )
};

export default CompletedTasksPage;