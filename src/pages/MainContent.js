import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import styles from '../styles/MainContent.module.css'
import ProfilePage from './profiles/ProfilePage'
import MyTasksToday from './tasks/MyTasksToday'
import TaskDetails from './tasks/TaskDetails'

function MainContent({ profile, tasksToday, taskDetails }) {

  return (
    <>
      <NavBar />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar />
          {profile ? <ProfilePage /> 
            : tasksToday ? <MyTasksToday />
            : taskDetails ? <TaskDetails />
            : <></>
          }
        </Row>
      </Container>
      <Footer />
    </>
    
  )
}

export default MainContent