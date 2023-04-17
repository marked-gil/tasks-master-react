import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import AddTask from './AddTask';
import styles from '../../styles/TasksByCategoryPage.module.css';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../api/categoryMethods';
import { getFilteredTasks } from '../../api/taskMethods';
import TasksFilter from '../../components/TasksFilter';
import { axiosReq } from '../../api/axiosDefaults';
import EditCategory from '../categories/EditCategory';

function TasksByCategoryPage({ categories }) {

  const { id } = useParams();
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categoryData, setCategoryData ] = useState({});
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});

  useEffect(() => {
    getCategory(id, setCategoryData, setError);
  }, [id]);

  useEffect(() => {
    const getTasksByCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?category=${id}`)
        setTasks(data)
      } catch (err) {
        console.log(err.response?.data)
        setError(err.response?.data)
      }
    }
    getTasksByCategory(id, setTasks, setError);
  }, [id])
  
  const handleFilterSubmit = async () => {
    getFilteredTasks({filters, setTasks, setError, category: categoryData.id});
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

        <div className="d-flex justify-content-between mb-3">
          <Card className="mt-2" style={{width:"80%"}}>
            <Card.Body className="pt-0">
              <Card.Title className="">Description:</Card.Title>
              <Card.Text className="ps-4 pe-4">{categoryData.description}</Card.Text>
            </Card.Body>
          </Card>
          <EditCategory 
            id={id}
            categoryData={categoryData}
            setCategoryData={setCategoryData}
            className="align-self-center" 
          />
        </div>

        <hr />

        <TasksFilter
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
          removeCategoryField
          removeOrderByTime
        />

        <hr />
      
        <TasksList
          tasks={tasks}
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