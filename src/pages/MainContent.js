import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import styles from '../styles/MainContent.module.css'
import ProfilePage from './profiles/ProfilePage'

function MainContent() {
  return (
    <>
      <NavBar />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar />
          <ProfilePage />
        </Row>
      </Container>
      <Footer />
    </>
    
  )
}

export default MainContent