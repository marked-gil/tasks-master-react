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
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';

function OffcanvasExample() {
  const setCurrentUser = useSetCurrentUser();

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
                  <Nav.Link href="#" className={`p-0 ${styles.ClrWhite}`}>My Tasks</Nav.Link>
                  <Nav.Link href="#" className={`p-0 ${styles.ClrWhite}`}>My Profile</Nav.Link>
                  <NavLink to="/signin" onClick={handleSignOut} className={`p-0 ${styles.ClrWhite}`}>Sign Out</NavLink>
                  {/* <Nav.Link href="#" className={`p-0 ${styles.ClrWhite}`}>Sign Out</Nav.Link> */}
                  <Nav.Link href="#" className="p-0"><img src={Avatar} alt="profile avatar" className={styles.Avatar}/></Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;