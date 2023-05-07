import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksList from './TasksList';
import styles from '../../styles/OverdueTasksPage.module.css';
import { getFilteredTasks } from '../../api/taskMethods';
import TasksFilter from '../../components/TasksFilter';
import LoadingIcon from '../../components/LoadingIcon';


function OverdueTasksPage({ changeInCategories }) {

  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ error, setError ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoaded(false);
      try {
        const [{ data: fetchedTasks }, { data: fetchedCategories }] = await Promise.all([
          axiosReq.get(`/tasks/?progress=overdue`),
          axiosReq.get(`/categories/`)
        ]);
        setTimeout(() => {
          setTasks(fetchedTasks);
          setCategories(fetchedCategories);
          setIsLoaded(true);
        }, 500)
      } catch (err) {
        setError("An ERROR has occurred while fetching data. Please try refreshing the page.")
        setIsLoaded(true);
      }
    } 
    fetchedData();
  }, [changeInCategories]);

  const handleFilterSubmit = async () => {
    setError("");
    getFilteredTasks({filters, setTasks, setError, overdueTasksOnly: true, setIsLoaded});
  };

  return (
    <Col className={styles.OverdueTasks}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.PageTitle}`}>OVERDUE</h2>
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
          showDate
          isLoaded={isLoaded}
          showOverdueTasksOnly
          setError={setError}
        />
      </div>
    </Col>  
  )
}

export default OverdueTasksPage;