import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import SignOutLink from '../pages/auth/SignOutLink';
import SearchForm from './SearchForm'

function NavBar({ currentUser, setSearchResults, setKeywordSearched }) {

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className={`${styles.NavBar}`}>
          <Container fluid>
            <Navbar.Brand href="#" className={`p-2 flex-grow-1 ${styles.ClrWhite}`}>LOGO Tasks Master</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Tasks Master
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <SearchForm setSearchResults={setSearchResults} setKeywordSearched={setKeywordSearched} />
                <Nav className={`${styles.Nav} justify-content-end align-items-center flex-grow-1 pe-3`}>
                  <NavLink to="/all-todos" className={`p-0 ${styles.ClrWhite}`}>My Tasks</NavLink>
                  <NavLink to={`/profile/${currentUser?.pk}`} className={`p-0 ${styles.ClrWhite}`}>My Profile</NavLink>
                  <SignOutLink className={`p-0 ${styles.ClrWhite}`} />
                  <NavLink to="" className="p-0"><img src={currentUser?.profile_image} alt="profile avatar" className={styles.Avatar}/></NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;