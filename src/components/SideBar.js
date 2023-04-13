import React, { useState } from 'react'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import moment from 'moment';
import styles from '../styles/SideBar.module.css'
import { Link, useHistory } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Form } from 'react-bootstrap';
import AddCategory from '../pages/categories/AddCategory';

const SideBar = ({ categories, setCategories, setNewCategoryAdded }) => {
  const currentUser = useCurrentUser();

  const [ tasksDate, setTasksDate ] = useState(null);
  const [ categoryID, setCategoryID ] = useState("");
  const history = useHistory();

  const handleDateSelection = (event) => {
    if (tasksDate) {
          history.push(`/tasks/${moment(tasksDate).format('YYYY-MM-DD')}`)
        }
  };

  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value)
  };

  const handleSubmitCategory = () => {
    if (categoryID) {
      history.push(`/categories/${categoryID}`)
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
          <Link to="/overdue-tasks"><i className="fa-sharp fa-solid fa-bell"></i> Overdue Tasks</Link>
        </li>
        <li>
          <Link to="/completed-tasks"><i className="fa-solid fa-check-double"></i> Completed Tasks</Link>
        </li>
      </ul>

      <div>
        <div className="d-flex align-items-center">
          <h2 className="me-3">Categories</h2>

          <AddCategory
            categories={categories}
            setCategories={setCategories}
            setNewCategoryAdded={setNewCategoryAdded}
          />
        </div>
        
        <div className="d-flex">
          <Form.Select
            className={`me-2`}
            style={{width: "15rem"}}
            aria-label="Select category"
            name="category_name"
            onChange={handleCategoryChange}
            size="lg"
          >
            <option>Select a Category</option>
            {categories.results.map((cat) => (
              <option value={cat.id} key={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </Form.Select>
          
          <Button onClick={handleSubmitCategory}>Go</Button>
        </div>
      </div>
    </div>
  )
}

export default SideBar