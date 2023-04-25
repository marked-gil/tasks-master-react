import React, { useState } from 'react'
import moment from 'moment';
import styles from '../styles/SideBar.module.css'
import { Link, useHistory } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddCategory from '../pages/categories/AddCategory';
import LoadingIcon from './LoadingIcon';
import AddTask from '../pages/tasks/AddTask';

const SideBar = (props) => {

  const { 
    currentUser, 
    setCategories, 
    categories, 
    isLoaded,
    setNewCategoryAdded
  } = props;

  const history = useHistory();
  const [ tasksDate, setTasksDate ] = useState(null);
  const [ categoryID, setCategoryID ] = useState("");

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
    <div className={`${styles.SideBar}`}>
      <p className={styles.UserGreeting}>
        Hi, <span className={`ms-1 ${styles.Username}`}>{currentUser?.username}</span>!
      </p>
      <ul className="d-flex flex-column gap-3 ps-0 mb-5 mt-5 position-relative">
        {!isLoaded && <LoadingIcon size="4" />}
        <li>
          <AddTask
            categories={categories}
            pushToPages
            className={styles.AddTask}
            pushToPage
          />
        </li>
        <li className={`mb-2 d-flex ${styles.DatePickerContainer}`}>
          <DatePicker
            className={`me-2`}
            label="Find Tasks by Date"
            value={tasksDate} 
            onChange={newValue => setTasksDate(newValue)}
            slotProps={{
              textField: {
                size: 'small',
                variant: 'filled', 
                fullWidth: true,
              },
            }}
          />
          <Button onClick={handleDateSelection}>Go</Button>
        </li>
        <li className="mb-2">
          <Link to="/"><i className="fa-solid fa-calendar-week me-3"></i> Today</Link>
        </li>
        <li className="mb-2">
          <Link to={`/tasks/${moment().add(1, 'days').format('YYYY-MM-DD')}`}>
            <i className="fa-sharp fa-solid fa-forward me-3"></i> Tomorrow
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/all-todos">
            <i className="fa-solid fa-list-check me-3"></i> All Todo Tasks
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/shared-tasks">
            <i className="fa-sharp fa-solid fa-share me-3"></i> Shared Tasks
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/overdue-tasks">
            <i className="fa-sharp fa-solid fa-bell me-3"></i> Overdue Tasks
          </Link>
        </li>
        <li>
          <Link to="/completed-tasks">
            <i className="fa-solid fa-check-double me-3"></i> Completed Tasks
          </Link>
        </li>
      </ul>

      <hr />

      <p className="mb-1">Find Tasks by Category</p>

      <div className={styles.CategoryFormContainer}>
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

      <AddCategory
        categories={categories}
        setCategories={setCategories}
        className={styles.AddCategory}
        setNewCategoryAdded={setNewCategoryAdded}
      />
    </div>
  )
}

export default SideBar;