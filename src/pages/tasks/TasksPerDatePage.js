import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getCategories } from '../../api/categoryMethods';
import { getFilteredTasks, getTasks } from '../../api/taskMethods';
import { Col } from 'react-bootstrap';
import styles from '../../styles/TasksPerDatePage.module.css';
import ErrorDisplay from '../../components/ErrorDisplay';
import TasksFilter from '../../components/TasksFilter';
import TasksList from './TasksList';
import AddTask from './AddTask';
import { useHistory, useParams } from 'react-router-dom';

function TasksPerDatePage() {

  const {due_date} = useParams();

  const history = useHistory();
  
  const is_DueDateTomorrow = moment().add(1, 'days').format('YYYY-MM-DD') === due_date;
  
  const [ changeInTasks, setChangeInTasks ] = useState({})
  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)
  const [ tasks, setTasks ] = useState({ results: []});
  const [ categories, setCategories ] = useState({ results: []});
  const [ error, setError ] = useState({});
  const [ filters, setFilters ] = useState({});

  useEffect(() => {
    if (due_date === moment().format('YYYY-MM-DD')) {
      history.push("/")
    }
  }, [due_date, history])

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    getTasks(setTasks, due_date);
  }, [changeInTasks, due_date]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    getFilteredTasks(filters, due_date, setTasks, setError);
  };

  return (
    <Col className={styles.MyTasks}>
      <div className={styles.InnerContainer}>
        {error?.data && <ErrorDisplay error={error} />}

        <div className={`d-flex justify-content-between`}>
          <h2 className={`${styles.Heading}`}>My Tasks</h2>
          <span className={styles.LineIcon}><i className="fa-solid fa-ellipsis-vertical"></i></span> 
          <h2>{`${is_DueDateTomorrow ? "TOMORROW" : "UPCOMING" }`}
            <span className={`d-block ${styles.Date}`}>{moment(due_date).format("D MMMM YYYY, dddd")}</span>
          </h2>
        </div>

        <TasksFilter
          setFilters={setFilters}
          categories={categories}
          setShowCompletedTasks={setShowCompletedTasks}
          showCompletedTasks={showCompletedTasks}
          handleFilterSubmit={handleFilterSubmit}
        />
        
        <hr />

        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          setChangeInTasks={setChangeInTasks}
          showCompletedTasks={showCompletedTasks}
        />
      </div>

      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
      />
    </Col>
  )
}

export default TasksPerDatePage;