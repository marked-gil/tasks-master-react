import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../styles/NavBar.module.css'

function OffcanvasExample() {

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
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#" className={styles.ClrWhite}>Home</Nav.Link>
                  <Nav.Link href="#" className={styles.ClrWhite}>My Tasks</Nav.Link>
                  <Nav.Link href="#" className={styles.ClrWhite}>Sign Out</Nav.Link>
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