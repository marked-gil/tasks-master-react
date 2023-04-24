import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import styles from '../styles/MainPageContainer.module.css';
import ProfilePage from './profiles/ProfilePage';
import TasksTodayPage from './tasks/TasksTodayPage';
import TaskDetailsPage from './tasks/TaskDetailsPage';
import TasksPerDatePage from './tasks/TasksPerDatePage';
import AllToDoTasksPage from './tasks/AllToDoTasksPage';
import OverdueTasksPage from './tasks/OverdueTasksPage';
import TasksByCategoryPage from './tasks/TasksByCategoryPage';
import CompletedTasksPage from './tasks/CompletedTasksPage';
import SharedTasksPage from './tasks/SharedTasksPage';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import SearchResultsPage from './tasks/SearchResultsPage';
import { axiosReq } from '../api/axiosDefaults';

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
    searchResultsPage
  } = props;

  const currentUser = useCurrentUser();
  const [ newCategoryAdded, setNewCategoryAdded ] = useState(false);
  const [ categories, setCategories ] = useState({ results: [] });
  const [ searchResults, setSearchResults ] = useState({ results: [] });
  const [ keywordSearched, setKeywordSearched ] = useState("");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoaded(false);
        const { data } = await axiosReq.get(`/categories/`);
        setCategories(data);
        setNewCategoryAdded(false);
        setIsLoaded(true);
      } catch (err) {
        console.log(err)
        setIsLoaded(true);
      }
    };
  
    getCategories();
  }, [setCategories, newCategoryAdded]);

  return (
    <>
      <NavBar 
        currentUser={currentUser} 
        setSearchResults={setSearchResults} 
        setKeywordSearched={setKeywordSearched}
        setCategories={setCategories}
        categories={categories}
      />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar 
            currentUser={currentUser} 
            categories={categories} 
            setCategories={setCategories}
            isLoaded={isLoaded}
          />
          {profile ? <ProfilePage currentUser={currentUser} /> 
            : tasksTodayPage ? <TasksTodayPage />
            : taskDetailsPage ? <TaskDetailsPage currentUser={currentUser} />
            : tasksPerDatePage ? <TasksPerDatePage /> 
            : allTodoTasksPage ? <AllToDoTasksPage /> 
            : overdueTasksPage ? <OverdueTasksPage />
            : tasksByCategoryPage ? <TasksByCategoryPage setNewCategoryAdded={setNewCategoryAdded}/>
            : completedTasksPage ? <CompletedTasksPage />
            : sharedTasksPage ? <SharedTasksPage />
            : searchResultsPage ? 
              <SearchResultsPage 
                searchResults={searchResults} 
                keywordSearched={keywordSearched} 
              />
            : <></>
          }
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default MainPageContainer;