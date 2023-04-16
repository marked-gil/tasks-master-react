import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import styles from '../styles/MainPageContainer.module.css'
import ProfilePage from './profiles/ProfilePage'
import TasksTodayPage from './tasks/TasksTodayPage'
import TaskDetailsPage from './tasks/TaskDetailsPage'
import TasksPerDatePage from './tasks/TasksPerDatePage'
import AllToDoTasksPage from './tasks/AllToDoTasksPage'
import { getCategories } from '../api/categoryMethods'
import OverdueTasksPage from './tasks/OverdueTasksPage'
import TasksByCategoryPage from './tasks/TasksByCategoryPage'
import CompletedTasksPage from './tasks/CompletedTasksPage'
import SharedTasksPage from './tasks/SharedTasksPage'
import { useCurrentUser } from '../contexts/CurrentUserContext'

function MainPageContainer(props) {

  const { 
    profile, 
    tasksTodayPage, 
    taskDetailsPage, 
    tasksPerDatePage, 
    allTodoTasksPage,
    overdueTasksPage,
    tasksByCategoryPage,
    completedTasksPage,
    sharedTasksPage,
  } = props;

  const currentUser = useCurrentUser();
  const [ newCategoryAdded, setNewCategoryAdded ] = useState(false);
  const [ categories, setCategories ] = useState({ results: []});

  useEffect(() => {
    getCategories(setCategories);
    setNewCategoryAdded(false)
  }, [setCategories, newCategoryAdded]);

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar currentUser={currentUser} />
          {profile ? <ProfilePage currentUser={currentUser} /> 
            : tasksTodayPage ? <TasksTodayPage categories={categories} />
            : taskDetailsPage ? <TaskDetailsPage />
            : tasksPerDatePage ? <TasksPerDatePage categories={categories} /> 
            : allTodoTasksPage ? <AllToDoTasksPage categories={categories} /> 
            : overdueTasksPage ? <OverdueTasksPage categories={categories} />
            : tasksByCategoryPage ? <TasksByCategoryPage categories={categories} />
            : completedTasksPage ? <CompletedTasksPage categories={categories} />
            : sharedTasksPage ? <SharedTasksPage categories={categories} />
            : <></>
          }
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default MainPageContainer;