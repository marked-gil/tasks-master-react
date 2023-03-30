import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'

function NavScrollExample() {
  return (
    <Navbar expand="lg" className={styles.NavBar}>
      <Container fluid className="d-flex">
        <Navbar.Brand href="#" className="p-2 flex-grow-1">Logo Tasks Master</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-5">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className={`ms-auto me-3 my-2 my-lg-0`}
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">My Tasks</Nav.Link>
            <Nav.Link href="#">Sign Out</Nav.Link>
          </Nav>

          <div>AVATAR</div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;