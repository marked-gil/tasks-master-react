import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../styles/NavBar.module.css'
import SignOutLink from '../pages/auth/SignOutLink';
import SearchForm from './SearchForm'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DatePicker } from '@mui/x-date-pickers';
import AddTask from '../pages/tasks/AddTask';
import moment from 'moment';
import AddCategory from '../pages/categories/AddCategory';
import logo from '../assets/tasks-master-logo-small.png';

function NavBar(props) {

  const { 
    currentUser, 
    setSearchResults, 
    setKeywordSearched,
    setCategories,
    handleChangeInCategory,
    categories,
    setIsLoaded,
    setError
  } = props;

  const history = useHistory();
  const [ tasksDate, setTasksDate ] = useState(null);
  const [ categoryID, setCategoryID ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  const handleDateSelection = () => {
    if (tasksDate) {
          history.push(`/tasks/${moment(tasksDate).format('YYYY-MM-DD')}`);
          toggleMenu();
        }
  };
  
  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value)
  };

  const handleSubmitCategory = () => {
    if (categoryID) {
      history.push(`/categories/${categoryID}`);
      toggleMenu();
    }
  };

  return (
    <>
      <Navbar expand="lg" className={`${styles.NavBar}`}>
        <Container fluid >
          <Navbar.Brand className="p-2">
            <img src={logo} alt="tasks master logo" className={styles.Logo}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} onClick={toggleMenu}/>

          <div className={`d-none d-lg-flex flex-grow-1 justify-content-end gap-5 ${styles.ExpandedNavContainer}`}>
            <SearchForm 
              setSearchResults={setSearchResults} 
              setKeywordSearched={setKeywordSearched}
              className={styles.SearchForm}
              setIsLoaded={setIsLoaded}
              setError={setError}
            />
            <Nav className={styles.Nav}>
              <NavLink to="/all-todos" className={styles.NavBarLink} 
                activeClassName={styles.ActiveLink}
              >
                My Tasks
              </NavLink>
              <NavLink to="/profile" className={styles.NavBarLink} activeClassName={styles.ActiveLink}>My Profile</NavLink>
              <SignOutLink className={styles.NavBarLink} />
              <img src={currentUser?.profile_image} alt="profile avatar" className={styles.Avatar}/>
            </Nav>
          </div>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className={`d-lg-none ${styles.NavBarOffCanvas}`}
            show={menuOpen}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <img src={currentUser?.profile_image} alt="profile avatar" className={`me-3 ${styles.Avatar}`}/>
                {currentUser?.username}
              </Offcanvas.Title>
            </Offcanvas.Header>

            {/* FOR SMALL SCREEN */}
            <Offcanvas.Body className={`d-flex flex-column d-lg-none mb-5 ${styles.OffCanvasBody}`}>
              <SearchForm 
                setSearchResults={setSearchResults} 
                setKeywordSearched={setKeywordSearched}
                className="d-flex"
                setIsLoaded={setIsLoaded}
                setError={setError}
                toggleMenu={toggleMenu}
              />
              <Nav className={`${styles.NavSmallScreen} mt-4`}>
                <NavLink to="/all-todos" className={`p-0 `} 
                  activeClassName={styles.OffCanvasActiveLink} 
                  onClick={toggleMenu}
                >
                  My Tasks
                </NavLink>
                <NavLink to="/profile" className={`p-0`} 
                  activeClassName={styles.OffCanvasActiveLink} 
                  onClick={toggleMenu}
                >
                  My Profile
                </NavLink>
                <SignOutLink className={`p-0`} />
              </Nav>

              <hr />

              <ul className="d-flex flex-column gap-2 ps-0 position-relative">
                <li>
                  <AddTask
                    categories={categories}
                    className={styles.AddTask}
                    toggleMenu={toggleMenu}
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
                  <Button 
                    onClick={handleDateSelection}
                  >
                    Go
                  </Button>
                </li>
                <li className={`mb-2`}>
                  <NavLink exact to="/" onClick={toggleMenu} className={styles.OffCanvasLink} 
                    activeClassName={styles.OffCanvasActiveLink}
                  >
                    <i className="fa-solid fa-calendar-week me-3"></i> Today
                  </NavLink>
                </li>
                <li className={`mb-2`}>
                  <NavLink to={`/tasks/${moment().add(1, 'days').format('YYYY-MM-DD')}`} onClick={toggleMenu}
                    className={styles.OffCanvasLink} activeClassName={styles.OffCanvasActiveLink}
                  >
                    <i className="fa-sharp fa-solid fa-forward me-3"></i> Tomorrow
                  </NavLink>
                </li>
                <li className={`mb-2`}>
                  <NavLink to="/all-todos" onClick={toggleMenu} className={styles.OffCanvasLink}
                    activeClassName={styles.OffCanvasActiveLink}
                  >
                    <i className="fa-solid fa-list-check me-3"></i> All Todo Tasks
                  </NavLink>
                </li>
                <li className={`mb-2`}>
                  <NavLink to="/shared-tasks" onClick={toggleMenu} className={styles.OffCanvasLink}
                    activeClassName={styles.OffCanvasActiveLink}
                  >
                    <i className="fa-sharp fa-solid fa-share me-3"></i> Shared Tasks
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink to="/overdue-tasks" onClick={toggleMenu} className={styles.OffCanvasLink}
                    activeClassName={styles.OffCanvasActiveLink}
                  >
                    <i className="fa-sharp fa-solid fa-bell me-3"></i> Overdue Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/completed-tasks" onClick={toggleMenu} className={styles.OffCanvasLink} 
                    activeClassName={styles.OffCanvasActiveLink}
                  >
                    <i className="fa-solid fa-check-double me-3"></i> Completed Tasks
                  </NavLink>
                </li>
              </ul>

              <hr />

              <p className="mb-0">Find Tasks by Category</p>

              <div className={`d-flex justify-content-between mt-2 ${styles.CategoryFormContainer}`}>
                <Form.Select
                  className={`me-2`}
                  style={{width: "15rem"}}
                  aria-label="Select category"
                  name="category_name"
                  onChange={handleCategoryChange}
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
                currentUser={currentUser}
                categories={categories}
                setCategories={setCategories}
                handleChangeInCategory={handleChangeInCategory}
                className={styles.AddCategory}
              />
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;