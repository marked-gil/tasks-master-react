import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../components/SideBar'
import styles from '../styles/MainContent.module.css'
import ProfilePage from './profiles/ProfilePage'

function MainContent() {
  return (
    <Container fluid className={styles.MainContent}>
      <Row className={styles.Row}>
        <SideBar />
        <ProfilePage />
        {/* <Col></Col> */}
      </Row>
    </Container>
  )
}

export default MainContent