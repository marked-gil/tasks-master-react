import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import AddTask from './AddTask';
import styles from '../../styles/TasksByCategoryPage.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom';

function TasksByCategoryPage({ categories }) {

  const { id } = useParams();
  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categoryData, setCategoryData ] = useState({})
  const [ error, setError ] = useState({});

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/${id}`);
        setCategoryData(data);
        console.log("Category data", data)
      } catch (err) {
        console.log(err.response?.data)
        setError(err.response?.data);
      }
    }
    getCategory();
  }, [id]);

  useEffect(() => {
    const getTasksByCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?category=${id}`)
        setTasks(data)
        console.log("Tasks By Category", data)
      } catch (err) {
        console.log(err.response?.data)
        setError(err.response?.data)
      }
    }
    getTasksByCategory();
  }, [changeInTasks, id])
  
  return (
    <Col className={styles.TasksByCategory}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>{categoryData.category_name}</h2>
        </div>

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

export default TasksByCategoryPage;