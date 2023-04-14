import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../styles/NavBar.module.css'
import Avatar from '../assets/profile-avatar.jpg'
import { NavLink } from 'react-router-dom';
import { useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';

function NavBar() {
  const setCurrentUser = useSetCurrentUser();
  // const currentUser =useCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

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
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="search"
                  />
                  <Button variant="outline-success" className={styles.ClrWhite}>Search</Button>
                </Form>
                <Nav className={`${styles.Nav} justify-content-end align-items-center flex-grow-1 pe-3`}>
                  <NavLink to="/all-todos" className={`p-0 ${styles.ClrWhite}`}>My Tasks</NavLink>
                  {/* <NavLink to={`/profile/${currentUser?.pk}`} className={`p-0 ${styles.ClrWhite}`}>My Profile</NavLink> */}
                  <NavLink to="/signin" onClick={handleSignOut} className={`p-0 ${styles.ClrWhite}`}>Sign Out</NavLink>
                  <NavLink to="" className="p-0"><img src={Avatar} alt="profile avatar" className={styles.Avatar}/></NavLink>
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