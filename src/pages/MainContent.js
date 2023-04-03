import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import styles from '../styles/MainContent.module.css'
import ProfilePage from './profiles/ProfilePage'
import MyTasksToday from './tasks/MyTasksToday'

function MainContent({ profile, tasksToday }) {

  return (
    <>
      <NavBar />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar />
          {profile ? <ProfilePage /> 
          : tasksToday ? <MyTasksToday />
          : <></>

          }
        </Row>
      </Container>
      <Footer />
    </>
    
  )
}

export default MainContent