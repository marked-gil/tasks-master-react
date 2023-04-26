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

function AllToDoTasksPage({ newCategoryAdded }) {

  const [ tasks, setTasks ] = useState({ results: [] });
  const [ categories, setCategories ] = useState({ results: [] });
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ error, setError ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const getTodoTasks = async () => {
      try {
        setIsLoaded(false);
        const [{ data: fetchedTasks }, {data: fetchedCategories }] = await Promise.all([
          axiosReq.get(`/tasks/?progress=to-do`),
          axiosReq.get(`/categories/`)
        ]);
        setTasks(fetchedTasks);
        setCategories(fetchedCategories);
        setIsLoaded(true);
      } catch (err) {
        setError("An error has occurred while fetching data. Please try refreshing the page.");
        setIsLoaded(true);
      }
    }
    getTodoTasks()
  }, [newCategoryAdded]);

  const handleFilterSubmit = async () => {
    setError("");
    setFeedbackMessage("");
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
          isLoaded={isLoaded}
          showAllTodosOnly
        />

      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        setError={setError}
        categories={categories}
        setFeedbackMessage={setFeedbackMessage}
        allTodos
        className="mb-5"
      />
    </Col>
  )
};

export default AllToDoTasksPage;