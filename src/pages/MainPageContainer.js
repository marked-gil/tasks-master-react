import { useEffect, useState } from 'react';
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
import SearchResultsPage from './tasks/SearchResultsPage';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';
import PageNotFoundPage from './PageNotFound/PageNotFoundPage';


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
    searchResultsPage,
    pageNotFoundPage
  } = props;

  const currentUser = useCurrentUser();
  const [ changeInCategories, setChangeInCategories ] = useState(false);
  const [ newTaskAdded, setNewTaskAdded ] = useState(false);
  const [ categories, setCategories ] = useState({ results: [] });
  const [ searchResults, setSearchResults ] = useState({ results: [] });
  const [ keywordSearched, setKeywordSearched ] = useState("");
  const [ error, setError ] = useState("")
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ taskChanged, setTaskChanged ] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoaded(false);
      try {
        const { data } = await axiosReq.get(`/categories/`);
        setCategories(data);
        setIsLoaded(true);
      } catch (err) {
        setIsLoaded(true);
      }
    };
    getCategories();
  }, [changeInCategories]);

  const handleChangeInCategory = () => {
    setChangeInCategories(!changeInCategories)
  }

  return (
    <>
      <NavBar 
        currentUser={currentUser} 
        setSearchResults={setSearchResults} 
        setKeywordSearched={setKeywordSearched}
        setCategories={setCategories}
        handleChangeInCategory={handleChangeInCategory}
        categories={categories}
        setIsLoaded={setIsLoaded}
        setError={setError}
      />
      <Container fluid className={styles.MainContent}>
        <Row className={styles.Row}>
          <SideBar 
            currentUser={currentUser} 
            handleChangeInCategory={handleChangeInCategory} 
            setNewTaskAdded={setNewTaskAdded}
            newTaskAdded={newTaskAdded}
            changeInCategories={changeInCategories}
          />
          {profile ? <ProfilePage currentUser={currentUser} /> 
            : tasksTodayPage ? <TasksTodayPage 
                changeInCategories={changeInCategories}
                taskChanged={taskChanged}
              />
            : taskDetailsPage ? <TaskDetailsPage
                changeInCategories={changeInCategories}
                setTaskChanged={setTaskChanged}
              />
            : tasksPerDatePage ? <TasksPerDatePage changeInCategories={changeInCategories} newTaskAdded={newTaskAdded} /> 
            : allTodoTasksPage ? <AllToDoTasksPage changeInCategories={changeInCategories} /> 
            : overdueTasksPage ? <OverdueTasksPage changeInCategories={changeInCategories}   />
            : tasksByCategoryPage ? <TasksByCategoryPage handleChangeInCategory={handleChangeInCategory} />
            : completedTasksPage ? <CompletedTasksPage changeInCategories={changeInCategories} />
            : sharedTasksPage ? <SharedTasksPage changeInCategories={changeInCategories} />
            : searchResultsPage ? <SearchResultsPage
                setSearchResults={setSearchResults}
                searchResults={searchResults} 
                keywordSearched={keywordSearched}
                isLoaded={isLoaded}
                error={error}
              />
            : pageNotFoundPage ? <PageNotFoundPage /> 
            : <></>
          }
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default MainPageContainer;