import React, { useState } from 'react'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import moment from 'moment';
import styles from '../styles/SideBar.module.css'
import { Link, useHistory } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { Button } from 'react-bootstrap';
import AddCategory from '../pages/categories/AddCategory';

const SideBar = ({ categories, setCategories, setNewCategoryAdded }) => {
  const currentUser = useCurrentUser();

  const [ tasksDate, setTasksDate ] = useState(null)
  const history = useHistory();

  const handleDateSelection = (event) => {
    if (tasksDate) {
          history.push(`/tasks/${moment(tasksDate).format('YYYY-MM-DD')}`)
        }
  }

  return (
    <div className={styles.SideBar}>
      <p>Hi, {currentUser?.username}!</p>
      <ul className="ps-0 mb-5">
        <li className="mb-2 d-flex">
          <DatePicker
            className={`me-2`}
            label="Find Tasks by Date"
            value={tasksDate} 
            onChange={newValue => setTasksDate(newValue)}
            slotProps={{
              textField: {
                helperText: 'MM / DD / YYYY',
              },
            }}
          />
          <Button className={`align-self-start ${styles.DatePickerBtn}`} onClick={handleDateSelection}>Go</Button>
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
          <Link to="/all-todos"><i className="fa-solid fa-list-check"></i> All Todo Tasks</Link>
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
          <AddCategory categories={categories} setCategories={setCategories} setNewCategoryAdded={setNewCategoryAdded} />
        </div>
  
        <ul className="ps-0">
          {
            categories.results.map(item => 
              <li className="mb-2" key={item.category_name}>
                <Link>{item.category_name}</Link>
              </li>
            )
          }
        </ul>
      </div>
      <Link><i className="fa-solid fa-check-double"></i> Recently Completed Tasks</Link>
    </div>
  )
}

export default SideBar