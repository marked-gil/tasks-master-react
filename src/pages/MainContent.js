import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../components/SideBar'
import styles from '../styles/MainContent.module.css'

function MainContent() {
  return (
    <Container fluid className={styles.MainContent}>
      <Row className={styles.Row}>
        <SideBar />
        <Col className={styles.Div} ></Col>
      </Row>
    </Container>
  )
}

export default MainContent