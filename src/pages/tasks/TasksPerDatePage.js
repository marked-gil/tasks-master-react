import { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { getFilteredTasks } from '../../api/taskMethods';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/TasksPerDatePage.module.css';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import AddTask from './AddTask';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingIcon from '../../components/LoadingIcon';

function TasksPerDatePage({ changeInCategories, newTaskAdded }) {

  const dateToday = moment().format('YYYY-MM-DD');
  const { due_date } = useParams();
  const history = useHistory();
  const is_DueDateTomorrow = moment().add(1, 'days').format('YYYY-MM-DD') === due_date;
  const is_DueDatePrevious = due_date < dateToday;
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false);
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: [] });
  const [ error, setError ] = useState("");
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (due_date === dateToday) {
      history.push("/")
    }
  }, [due_date, history, dateToday]);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoaded(false);
      try {
        const [{ data: fetchedTasks }, { data: fetchedCategories }] = await Promise.all([
          axiosReq.get(`/tasks/?due_date=${moment(due_date).format("yyyy-MM-DD")}`),
          axiosReq.get(`/categories/`)
        ]);
        setTimeout(() => {
          setTasks(fetchedTasks);
          setCategories(fetchedCategories);
          setIsLoaded(true);
        }, 1000)
      } catch (err) {
        setError("An ERROR has occurred. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    fetchedData();
  }, [due_date, changeInCategories, newTaskAdded]);

  const handleFilterSubmit = async () => {
    setError("")
    setFeedbackMessage("")
    getFilteredTasks({filters, setTasks, setError, due_date, setIsLoaded});
  };

  return (
    <Col className={styles.MyTasks}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}
        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={styles.PageTitle}>{`${is_DueDateTomorrow ? "TOMORROW" : is_DueDatePrevious ? "PREVIOUS" : "UPCOMING" }`}
            <span className={`${styles.Date} ${styles.LargeScreen}`}>{moment(due_date).format("D MMMM YYYY, dddd")}</span>
            <span className={`${styles.Date} ${styles.SmallScreen}`}>{moment(due_date).format("D MMM YYYY, ddd")}</span>
          </h2>
        </div>

        <TasksFilter
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
          removeOrderByDate
          removeProgressField
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
        task_date={due_date}
        className="mb-5"
      />
    </Col>
  )
}

export default TasksPerDatePage;