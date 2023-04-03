import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import styles from '../styles/MainContent.module.css'
import ProfilePage from './profiles/ProfilePage'

function MainContent({ profile }) {

  return (
    <>
      <NavBar />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar />
          {profile ? <ProfilePage/> 
          : <></>

          }
        </Row>
      </Container>
      <Footer />
    </>
    
  )
}

export default MainContent