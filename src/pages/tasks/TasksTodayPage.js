import { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import moment from 'moment';
import styles from '../../styles/TasksTodayPage.module.css';
import Col from 'react-bootstrap/Col';
import AddTask from './AddTask';
import { getFilteredTasks } from '../../api/taskMethods';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import LoadingIcon from '../../components/LoadingIcon';
import FeedbackMessage from '../../components/FeedbackMessage';


function TasksTodayPage({ changeInCategories, taskChanged }) {

  const dateToday = moment().format("YYYY-MM-DD");
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ error, setError ] = useState("");
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoaded(false);
      try {
        const [{ data: fetchedTasks }, { data: fetchedCategories }] = await Promise.all([
          axiosReq.get(`/tasks/?due_date=${moment(dateToday).format("yyyy-MM-DD")}`),
          axiosReq.get(`/categories/`)
        ]);
        setTimeout(() => {
          setTasks(fetchedTasks);
          setCategories(fetchedCategories);
          setIsLoaded(true);
        }, 500)
      } catch (err) {
        setError("An ERROR has occurred. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    fetchedData();
  }, [dateToday, changeInCategories, taskChanged]);
  
  const handleFilterSubmit = async () => {
    setError("");
    setFeedbackMessage("");
    getFilteredTasks({filters, setTasks, setError, dateToday, setIsLoaded});
  };

  return (
    <Col className={styles.MyTasksToday}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}
        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.MyTasks}`}>My Tasks</h2>
            <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={styles.PageTitle}>TODAY 
            <span className={`${styles.DateToday} ${styles.LargeScreen}`}>{moment().format("D MMMM YYYY, dddd")}</span>
            <span className={`${styles.DateToday} ${styles.SmallScreen}`}>{moment().format("D MMM YYYY, ddd")}</span>
          </h2>
        </div>

        <TasksFilter
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
          removeOrderByDate
        />
        
        <hr />

        <TasksList
          tasks={tasks}
          showCompletedTasks={showCompletedTasks}
          showTime
          isLoaded={isLoaded}
          setError={setError}
        />

      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setError={setError}
        categories={categories}
        setFeedbackMessage={setFeedbackMessage}
        task_date={dateToday}
        className="mb-5"
      />
    </Col>
  )
}

export default TasksTodayPage;