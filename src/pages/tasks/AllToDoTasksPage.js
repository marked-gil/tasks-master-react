import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import ErrorDisplay from '../../components/ErrorDisplay';
import styles from '../../styles/AllToDoTasksPage.module.css';
import TasksList from './TasksList';
import { getFilteredTasks } from '../../api/taskMethods';
import AddTask from './AddTask';
import TasksFilter from '../../components/TasksFilter';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingIcon from '../../components/LoadingIcon';

function AllToDoTasksPage({ categories }) {

  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ error, setError ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const getTodoTasks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?progress=to-do`
        );
        setTasks(data);
        setIsLoaded(true);
      } catch (err) {
        setError("Sorry, an error has occurred. Please try refreshing the page.");
        setIsLoaded(true);
      }
    }
    getTodoTasks()
  }, []);

  const handleFilterSubmit = async () => {
    setError("")
    setFeedbackMessage("")
    getFilteredTasks({filters, setTasks, setError, todoTasksOnly:true, setIsLoaded});
  };

  return (
    <Col className={styles.AllTodoTasks}>
      {!isLoaded && <LoadingIcon size="6" />}

      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}
        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={styles.PageTitle}>ALL TO-DOs</h2>
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
        />
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setError={setError}
        categories={categories}
        setFeedbackMessage={setFeedbackMessage}
        allTodos
      />
    </Col>
  )
};

export default AllToDoTasksPage;