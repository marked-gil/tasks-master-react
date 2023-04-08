import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import moment from 'moment';
import styles from '../styles/SideBar.module.css'
import { Link, useHistory } from 'react-router-dom';

const SideBar = () => {
  const currentUser = useCurrentUser();

  // const [ tasksDate, setTasksDate ] = useState(null)
  const history = useHistory();

  // useEffect(() => {
  //   if (tasksDate) {
  //     history.push(`/tasks/${moment(tasksDate).format('YYYY-MM-DD')}`)
  //   }
  // }, [tasksDate, history])

  return (
    <div className={styles.SideBar}>
      <p>Hi, {currentUser?.username}!</p>
      <ul className="ps-0 mb-5">
        <li className="mb-2">
          {/* <DatePicker 
            label="Select Tasks Date" 
            value={tasksDate} 
            onChange={newValue => setTasksDate(newValue)}
          /> */}
        </li>
        <li className="mb-2">
          <Link><i className="fa-solid fa-plus"></i> Add Task</Link>
        </li>
        <li className="mb-2">
          <Link to="/"><i className="fa-solid fa-calendar-week"></i> Today</Link>
        </li>
        <li className="mb-2">
          <Link to={`/tasks/${moment().add(1, 'days').format('YYYY-MM-DD')}`}><i className="fa-sharp fa-solid fa-forward"></i> Tomorrow</Link>
        </li>
        <li className="mb-2">
          <Link><i className="fa-solid fa-list-check"></i> All My Tasks</Link>
        </li>
        <li className="mb-2">
          <Link><i className="fa-sharp fa-solid fa-share"></i> Shared Tasks</Link>
        </li>
        <li className="mb-2">
          <Link><i className="fa-sharp fa-solid fa-bell"></i> Overdue Tasks</Link>
        </li>
      </ul>
      <div>
        <div className="d-flex align-items-center">
          <h2 className="me-3">Categories</h2>
          <Link><i className="fa-solid fa-plus"></i> Add New</Link>
        </div>
        <ul className="ps-0">
          <li className="mb-2">
            <Link>At Home</Link>
          </li>
          <li className="mb-2">
            <Link>At Work</Link>
          </li>
        </ul>
      </div>
      <Link><i className="fa-solid fa-check-double"></i> Recently Completed Tasks</Link>
    </div>
  )
}

export default SideBar