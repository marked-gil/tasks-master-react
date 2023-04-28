import { useEffect, useState } from 'react';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/SharedTasksPage.module.css';
import { getFilteredTasks } from '../../api/taskMethods';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import LoadingIcon from '../../components/LoadingIcon';

function SharedTasksPage({ newCategoryAdded }) {
  const currentUser = useCurrentUser();
  const id = currentUser?.pk

  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        setIsLoaded(false);
        const [{ data: fetchedTasks }, { data: fetchedCategories }] = await Promise.all([
          axiosReq.get(`/tasks/?is_shared=true`),
          axiosReq.get(`/categories/`)
        ]);
        setTasks(fetchedTasks);
        setCategories(fetchedCategories);
        setIsLoaded(true);
      } catch (err) {
        setError("An ERROR has occurred. Please try refreshing the page.");
        setIsLoaded(true);
      }
    }
    if (id) {
      fetchedData();
    }
  }, [id, newCategoryAdded]);

  const handleFilterSubmit = async () => {
    setError("");
    getFilteredTasks({
      filters,
      setTasks,
      setError,
      sharedTasksOnly: true,
      user_id: id,
      setIsLoaded
    });
  };

  return (
    <Col className={styles.SharedTasksPage}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}
        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.PageTitle}`}>SHARED</h2>
        </div>

        <TasksFilter 
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
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

    </Col>
  )
}

export default SharedTasksPage;