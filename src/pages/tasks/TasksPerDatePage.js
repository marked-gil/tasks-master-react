import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getFilteredTasks } from '../../api/taskMethods';
import { Col } from 'react-bootstrap';
import styles from '../../styles/TasksPerDatePage.module.css';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import AddTask from './AddTask';
import { useHistory, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingIcon from '../../components/LoadingIcon';

function TasksPerDatePage({ categories }) {

  const dateToday = moment().format('YYYY-MM-DD')
  const { due_date } = useParams();
  const history = useHistory();
  const is_DueDateTomorrow = moment().add(1, 'days').format('YYYY-MM-DD') === due_date;
  const is_DueDatePrevious = due_date < dateToday
  
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)
  const [ tasks, setTasks ] = useState({ results: []});
  const [ error, setError ] = useState("");
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (due_date === dateToday) {
      history.push("/")
    }
  }, [due_date, history, dateToday])

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoaded(false);
        const { data } = await axiosReq.get(
          `/tasks/?due_date=${moment(due_date).format("yyyy-MM-DD")}`
        );
        setTasks(data);
        setIsLoaded(true);
      } catch (err) {
        setError("Sorry, an error has occurred. Please try refreshing the page.")
        setIsLoaded(true);
      }
    }
    getTasks();
  }, [due_date]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
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
        />
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setError={setError}
        categories={categories}
        setFeedbackMessage={setFeedbackMessage}
        task_date={due_date}
      />
    </Col>
  )
}

export default TasksPerDatePage;