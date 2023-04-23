import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
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
  const [ error, setError ] = useState("");
  const [ isLoaded , setIsLoaded ] = useState(false);
  const [ editCategory, setEditCategory ] = useState(false);
  const { category_name, description } = categoryData;

  useEffect(() => {
    getCategory(id, setCategoryData, setError);
  }, [id, editCategory]);

  useEffect(() => {
    const getTasksByCategory = async () => {
      try {
        setIsLoaded(false);
        const { data } = await axiosReq.get(`/tasks/?category=${id}`)
        setTasks(data);
        setIsLoaded(true);
      } catch (err) {
        setError("Sorry, an error has occurred in fetching data. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    getTasksByCategory(id, setTasks, setError);
  }, [id])
  
  const cancelEditCategory = () => {
    setError("");
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
      setError("");
      setIsLoaded(false);
      const { data } = await axiosReq.patch(`categories/${id}`, formData);
      setCategoryData(data);
      console.log(data)
      setCategories(prevState => (
        { 
          results: prevState.results.map(item => 
            item.id === data.id ? data : item
          )
        }
      ))
      setEditCategory(false);
      setIsLoaded(true);
    } catch (err) {
      setError("Sorry, an error occurred when updating the category. Refresh page and try again.")
      setIsLoaded(true);
    }
  }

  const handleDeleteCategory = async() => {
    try {
      setError("");
      setIsLoaded(false);
      setCategories(prevState => (
        {results: prevState.results.filter(item => item.id !== categoryData.id)}
      ))
      await axiosRes.delete(`categories/${id}`);
      history.push("/");
      setIsLoaded(true);
    } catch (err) {
      setError("Sorry, an error has occurred when deleting the category. Refresh the page and try again.")
      setIsLoaded(true);
    }
  }

  const handleFilterSubmit = async () => {
    setError("");
    getFilteredTasks({filters, setTasks, setError, category: categoryData.id, setIsLoaded});
  };

  return (
    <Col className={styles.TasksByCategory}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}

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
            {!editCategory &&
              <h2 className={`mb-0 ${styles.HeadingTwo}`}>{categoryData.category_name}</h2>
            }

            {editCategory && 
              <>
                <p className="mb-0 me-2">Category:</p>
                <Form.Control 
                  type="text" 
                  maxLength="50" 
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
        setError={setError}
        categories={categories}
      />
    </Col>
  )
};

export default TasksByCategoryPage;