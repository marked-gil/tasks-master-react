import React, { useEffect, useState } from 'react';
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

function TasksTodayPage({ categories }) {
  const due_date = moment().format("YYYY-MM-DD")
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)
  const [ tasks, setTasks ] = useState({ results: []});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ error, setError ] = useState("");
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
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
    <Col className={styles.MyTasksToday}>
      <div className={`position-relative ${styles.InnerContainer}`}>
        {!isLoaded && <LoadingIcon size="6" />}
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
        />

      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
        setFeedbackMessage={setFeedbackMessage}
        task_date={due_date}
      />
    </Col>
  )
}

export default TasksTodayPage;