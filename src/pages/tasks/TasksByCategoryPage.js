import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import AddTask from './AddTask';
import styles from '../../styles/TasksByCategoryPage.module.css';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../api/categoryMethods';
import { getFilteredTasks, getTasksByCategory } from '../../api/taskMethods';
import TasksFilter from '../../components/TasksFilter';

function TasksByCategoryPage({ categories }) {

  const { id } = useParams();
  const [ changeInTasks, setChangeInTasks ] = useState({});
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categoryData, setCategoryData ] = useState({});
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ filters, setFilters ] = useState({});
  const [ error, setError ] = useState({});

  useEffect(() => {
    getCategory(id, setCategoryData, setError);
  }, [id]);

  useEffect(() => {
    getTasksByCategory(id, setTasks, setError);
  }, [changeInTasks, id])
  
  const handleFilterSubmit = async () => {
    getFilteredTasks(filters, setTasks, setError);
  };


  return (
    <Col className={styles.TasksByCategory}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>{categoryData.category_name}</h2>
        </div>

        <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
        />


        <hr />
      
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showCompletedTasks={showCompletedTasks}
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

export default TasksByCategoryPage;