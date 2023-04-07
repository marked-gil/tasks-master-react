import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import styles from '../styles/MainPageContainer.module.css'
import ProfilePage from './profiles/ProfilePage'
import TasksTodayPage from './tasks/TasksTodayPage'
import TaskDetailsPage from './tasks/TaskDetailsPage'

function MainContent({ profile, tasksTodayPage, taskDetailsPage }) {

  return (
    <>
      <NavBar />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar />
          {profile ? <ProfilePage /> 
            : tasksTodayPage ? <TasksTodayPage />
            : taskDetailsPage ? <TaskDetailsPage />
            : <></>
          }
        </Row>
      </Container>
      <Footer />
    </>
    
  )
}

export default MainContent