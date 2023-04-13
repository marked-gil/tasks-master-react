import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../../styles/TasksTodayPage.module.css';
import Col from 'react-bootstrap/Col';
import AddTask from './AddTask';
import { getFilteredTasks, getTasks } from '../../api/taskMethods';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import SuccessFeedback from '../../components/SuccessFeedback';

function TasksTodayPage({ categories }) {

  const due_date = moment().format("YYYY-MM-DD")

  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)
  const [ tasks, setTasks ] = useState({ results: []});
  const [ successFeedback, setSuccessFeedback ] = useState("");
  const [ error, setError ] = useState({});
  const [ filters, setFilters ] = useState({category_name: "", progress: "", order_by: ""});

  useEffect(() => {
    getTasks(setTasks);
  }, [changeInTasks]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    getFilteredTasks({filters, setTasks, setError, due_date});
  };

  return (
    <Col className={styles.MyTasksToday}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}
        {successFeedback && <SuccessFeedback message={successFeedback} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.MyTasks}`}>My Tasks</h2>
            <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>Today <span className={`d-block ${styles.DateToday}`}>{moment().format("D MMMM YYYY, dddd")}</span></h2>
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
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showCompletedTasks={showCompletedTasks}
          showTime
        />

      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
        setSuccessFeedback={setSuccessFeedback}
      />
    </Col>
  )
}

export default TasksTodayPage;