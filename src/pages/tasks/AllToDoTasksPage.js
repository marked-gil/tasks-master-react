import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ErrorDisplay from '../../components/ErrorDisplay';
import styles from '../../styles/AllToDoTasksPage.module.css';
import TasksList from './TasksList';
import { getFilteredTasks } from '../../api/taskMethods';
import AddTask from './AddTask';
import TasksFilter from '../../components/TasksFilter';
import { axiosReq } from '../../api/axiosDefaults';
import FeedbackMessage from '../../components/FeedbackMessage';

function AllToDoTasksPage({ categories }) {

  const [ tasks, setTasks ] = useState({ results: []});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});
  const [ feedbackMessage, setFeedbackMessage ] = useState("");
  const [ error, setError ] = useState({});

  useEffect(() => {
    const getTodoTasks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?progress=to-do`
        );
        setTasks(data);
      } catch (err) {
        console.log(err.response)
        setError(err.response);
      }
    }
    getTodoTasks()
  }, []);

  const handleFilterSubmit = async () => {
    getFilteredTasks({filters, setTasks, setError, todoTasksOnly:true});
  };

  return (
    <Col className={styles.AllTodoTasks}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}
        {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2 className={`${styles.Heading}`}>ALL TO-DOs</h2>
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
        categories={categories}
        setFeedbackMessage={setFeedbackMessage}
        allTodos
      />
    </Col>
  )
};

export default AllToDoTasksPage;