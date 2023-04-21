import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import AddTask from './AddTask';
import styles from '../../styles/TasksByCategoryPage.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { getCategory } from '../../api/categoryMethods';
import { getFilteredTasks } from '../../api/taskMethods';
import TasksFilter from '../../components/TasksFilter';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import LoadingIcon from '../../components/LoadingIcon';

function TasksByCategoryPage({ categories, setCategories }) {

  const { id } = useParams();
  const history = useHistory();
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categoryData, setCategoryData ] = useState({});
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState({});
  const [ isLoaded , setIsLoaded ] = useState(true);
  const [ editCategory, setEditCategory ] = useState(false);
  const { category_name, description } = categoryData;

  useEffect(() => {
    getCategory(id, setCategoryData, setError);
  }, [id, editCategory]);

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
  
  const cancelEditCategory = () => {
    setEditCategory(!editCategory);
  };

  const handleDataChange = (event) => {
    setCategoryData(prevState => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ))
  }

  const handleUpdateCategory = async() => {
    const formData = new FormData();
    formData.append('category_name', categoryData.category_name);
    formData.append('description', categoryData.description);

    try {
      setIsLoaded(false);
      const { data } = await axiosReq.patch(`categories/${id}`, formData);
      setCategoryData(data);
      setEditCategory(false);
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response);
      setIsLoaded(true);
    }
  }

  const handleDeleteCategory = async() => {
    try {
      setIsLoaded(false);
      setCategories(prevState => (
        {results: prevState.results.filter(item => item.id !== categoryData.id)}
      ))
      await axiosRes.delete(`categories/${id}`);
      history.push("/");
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response)
      setIsLoaded(true);
    }
  }

  const handleFilterSubmit = async () => {
    getFilteredTasks({filters, setTasks, setError, category: categoryData.id});
  };

  return (
    <Col className={styles.TasksByCategory}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex flex-column position-relative`}>
          <h2 className={`mb-0 ${styles.HeadingOne}`}>My Category</h2>

          {
            !editCategory && 
            <div className={`position-absolute end-0 ${styles.EditDeleteButtons}`}>
              <Button 
                variant="danger" 
                className={styles.DeleteButton}
                size="sm"
                onClick={handleDeleteCategory}
              >
                delete
              </Button>
              <Button 
                variant="primary" 
                className="m-0 ps-4 pe-4"
                size="sm"
                onClick={setEditCategory}
              >
                edit
              </Button>
            </div>
          }

          <div className="d-flex position-relative">
            {!isLoaded && <LoadingIcon size="5" />}
            {!editCategory &&
              <h2 className={`mb-0 ${styles.HeadingTwo}`}>{categoryData.category_name}</h2>
            }

            { 
              editCategory && 
              <>
                <p className="mb-0 me-2">Category:</p>
                <Form.Control 
                  type="text" 
                  maxLength="30" 
                  name="category_name"
                  defaultValue={category_name}
                  className="mb-1"
                  onChange={handleDataChange}
                />
              </>
            }
          </div>
        </div>
        
        <div className="d-flex mb-1 position-relative">
          <p className="mb-0 me-2">Description:</p>
          {!editCategory && 
            <p className="mb-0">{categoryData.description}</p>
          }

          {editCategory &&
            <Form.Control 
              as="textarea" 
              row="2"
              style={{maxHeight:"100px"}}
              maxLength="100" 
              name="description"
              defaultValue={description}
              onChange={handleDataChange}
            />
          }
        </div>
        
        <div className="d-flex justify-content-end">
          {   
            editCategory && 
            <>
              <Button
                variant="link" 
                className="m-0 me-2"
                size="sm"
                onClick={cancelEditCategory}
              >
                cancel
              </Button>
            
              <Button 
                variant="primary" 
                className="m-0"
                size="sm"
                onClick={handleUpdateCategory}
              >
                SAVE
              </Button>
            </>
          }
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