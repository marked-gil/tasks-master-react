import { useEffect, useState } from 'react'
import moment from 'moment';
import styles from '../styles/SideBar.module.css'
import { NavLink, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddCategory from '../pages/categories/AddCategory';
import LoadingIcon from './LoadingIcon';
import AddTask from '../pages/tasks/AddTask';
import { axiosReq } from '../api/axiosDefaults';
import DatePickerComponent from './DatePickerComponent';


const SideBar = (props) => {

  const { 
    currentUser, 
    handleChangeInCategory,
    changeInCategories,
    setNewTaskAdded,
    newTaskAdded
  } = props;

  const history = useHistory();
  const [ categoryID, setCategoryID ] = useState("");
  const [ categories, setCategories ] = useState({ results: [] });
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoaded(false);
      try {
        const { data } = await axiosReq.get(`/categories/`);
        setCategories(data);
        setIsLoaded(true);
      } catch (err) {
        setIsLoaded(true);
      }
    };
    getCategories();
  }, [changeInCategories]);

  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value);
  };

  const handleSubmitCategory = () => {
    if (categoryID) {
      history.push(`/categories/${categoryID}`);
    }
    setCategoryID("");
  }

  return (
    <div className={`${styles.SideBar}`}>
      {isLoaded && 
        <h2 className={styles.UserGreeting}>
          Hi, <span className={`ms-1 ${styles.Username}`}>{currentUser?.username}</span>!
        </h2>
      }
      <ul className="d-flex flex-column gap-3 ps-0 mb-5 mt-5 position-relative">
        {!isLoaded && <LoadingIcon size="4" />}
        <li>
          <AddTask
            categories={categories}
            pushToPages
            className={styles.AddTask}
            pushToPage
            setNewTaskAdded={setNewTaskAdded}
            newTaskAdded={newTaskAdded}
          />
        </li>
        <li className={`mb-2 d-flex ${styles.DatePickerContainer}`}>
          <DatePickerComponent />
        </li>
        <li className="mb-2">
          <NavLink exact to="/" className={styles.Link} activeClassName={styles.ActiveLink} >
            <i className="fa-solid fa-calendar-week me-3"></i> Today
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to={`/tasks/${moment().add(1, 'days').format('YYYY-MM-DD')}`} className={styles.Link}
            activeClassName={styles.ActiveLink}
          >
            <i className="fa-sharp fa-solid fa-forward me-3"></i> Tomorrow
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/all-todos" className={styles.Link} activeClassName={styles.ActiveLink}>
            <i className="fa-solid fa-list-check me-3"></i> All Todo Tasks
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/shared-tasks" className={styles.Link} activeClassName={styles.ActiveLink}>
            <i className="fa-sharp fa-solid fa-share me-3"></i> Shared Tasks
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/overdue-tasks" className={styles.Link} activeClassName={styles.ActiveLink}>
            <i className="fa-sharp fa-solid fa-bell me-3"></i> Overdue Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/completed-tasks" className={styles.Link} activeClassName={styles.ActiveLink}>
            <i className="fa-solid fa-check-double me-3"></i> Completed Tasks
          </NavLink>
        </li>
      </ul>

      <hr />

      <p className="mb-1">Find Tasks by Category</p>

      <div className={styles.CategoryFormContainer}>
        <Form.Select
          className={`me-2 text-capitalize`}
          style={{width: "15rem"}}
          aria-label="Select category"
          name="category_name"
          onChange={handleCategoryChange}
          size="lg"
        > 
          {!categories.results.length && <option value="">No Categories</option>}
          {!!categories.results.length && <option value="">Select a Category</option>}
          {categories.results.map((cat) => (
            <option value={cat.id} key={cat.category_name}>
              {cat.category_name}
            </option>
          ))}
        </Form.Select>
        
        <Button onClick={handleSubmitCategory}>Go</Button>
      </div>

      <AddCategory
        currentUser={currentUser}
        categories={categories}
        setCategories={setCategories}
        className={styles.AddCategory}
        handleChangeInCategory={handleChangeInCategory}
      />
    </div>
  )
}

export default SideBar;