import { useEffect, useState } from 'react';
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

function TasksByCategoryPage({ handleChangeInCategory }) {

  const { id } = useParams();
  const history = useHistory();
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ categoryData, setCategoryData ] = useState({});
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ editCategory, setEditCategory ] = useState(false);
  const { category_name, description } = categoryData;

  useEffect(() => {
    getCategory(id, setCategoryData, setError);
  }, [id, editCategory]);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoaded(false);
      setEditCategory(false);
      try {
        const [{ data: fetchedTasks }, { data: fetchedCategories }] = await Promise.all([
          axiosReq.get(`/tasks/?category=${id}`),
          axiosReq.get(`/categories/`)
        ]);
        setTimeout(() => {
          setTasks(fetchedTasks);
          setCategories(fetchedCategories);
          setIsLoaded(true);
        }, 500)
      } catch (err) {
        setError("An error has occurred while fetching data. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    fetchedData();
  }, [id]);
  
  const cancelEditCategory = () => {
    setError("");
    setEditCategory(!editCategory);
  };

  const handleDataChange = (event) => {
    setCategoryData(prevState => ({
      ...prevState,
        [event.target.name]: event.target.value
      })
    )
  };

  const handleUpdateCategory = async() => {
    setError("");
    setIsLoaded(false);

    const formData = new FormData();
    formData.append('category_name', categoryData.category_name);
    formData.append('description', categoryData.description);
    try {
      const { data } = await axiosReq.patch(`categories/${id}`, formData);
      setTimeout(() => {
        setCategoryData(data);
        setCategories(prevState => ({ 
          results: prevState.results.map(item => 
            item.id === data.id ? data : item)
          })
        )
        setEditCategory(false);
        handleChangeInCategory();
        setIsLoaded(true);
      }, 1000);
    } catch (err) {
      if (err.response?.data?.non_field_errors) {
        setError(err.response?.data?.non_field_errors[0])
      } else if (err.response?.data?.category_name) {
        setError("Category name cannot be blank.")
      } else {
        setError("Sorry, an error occurred when updating the category. Refresh page and try again.")
      }
      setIsLoaded(true);
    }
  };

  const handleDeleteCategory = async() => {
    try {
      setError("");
      setIsLoaded(false);
      setCategories(prevState => (
        {results: prevState.results.filter(item => item.id !== categoryData.id)}
      ))
      await axiosRes.delete(`categories/${id}`);
      setTimeout(() => {
        handleChangeInCategory();
        setIsLoaded(true);
        history.push("/");
      }, 1000)
    } catch (err) {
      setError("Sorry, an error has occurred when deleting the category. Refresh the page and try again.")
      setIsLoaded(true);
    }
  };

  const handleFilterSubmit = async () => {
    setError("");
    setEditCategory(false);
    getFilteredTasks({filters, setTasks, setError, category: categoryData.id, setIsLoaded});
  };

  return (
    <Col className={styles.TasksByCategory}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}

        <div className={`d-flex flex-column position-relative`}>
          <h2 className={`mb-0 ${styles.HeadingOne}`}>My Category</h2>

          {!editCategory && 
            <div className={`position-absolute end-0 ${styles.EditDeleteButtons}`}>
              <Button variant="danger" className={styles.DeleteButton} size="sm"
                onClick={handleDeleteCategory}
              >
                delete
              </Button>
              <Button variant="primary" className="m-0 ps-4 pe-4" size="sm"
                onClick={setEditCategory}
              >
                edit
              </Button>
            </div>
          }

          <div>
            {!editCategory &&
              <h2 className={`mb-0 ${styles.HeadingTwo}`}>{categoryData.category_name}</h2>
            }

            {editCategory && 
              <>
                <Form.Control
                  autoFocus
                  type="text"
                  plaintext
                  maxLength="50" 
                  name="category_name"
                  defaultValue={category_name}
                  className={styles.CategoryNameForm}
                  onChange={handleDataChange}
                />
                <p className="mb-0 me-2">Category</p>
              </>
            }
          </div>
        </div>
        
        <div className="position-relative">
          {!editCategory && !!categoryData.description &&
            <>
              <p className="mb-0 mt-4">{categoryData.description || "Add a description."}</p>
              <hr className="m-0" style={{ backgroundColor:"#699df6", color:"#699df6", height:"5px" }}/>
              <p className="mb-0 me-2 mb-3 text-muted">Description</p>
            </>
          }

          {editCategory &&
            <>
              <Form.Control 
                as="textarea" 
                row="3"
                plaintext
                style={{maxHeight:"100px"}}
                maxLength="100" 
                name="description"
                defaultValue={description}
                className={styles.DescriptionForm}
                onChange={handleDataChange}
              />
              <p className="mb-4 me-2 text-muted">Description</p>

              <div className={`${styles.SaveCancelButtons}`}>
                <Button variant="link" className="m-0 me-2" size="sm" onClick={cancelEditCategory}>
                  cancel
                </Button>
              
                <Button variant="primary" className="m-0 ps-4 pe-4" size="sm" onClick={handleUpdateCategory}>
                  SAVE
                </Button>
              </div>
            </>
          }
        </div>

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
          isLoaded={isLoaded}
          setError={setError}
        />
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setError={setError}
        categories={categories}
        setEditCategory={setEditCategory}
        className="mb-5"
      />
    </Col>
  )
}

export default TasksByCategoryPage;