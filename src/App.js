import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainPageContainer from './pages/MainPageContainer';
import styles from './App.module.css';
import { useCurrentUser } from './contexts/CurrentUserContext';
import { useState } from 'react';
import { ProtectedRoutes } from './pages/auth/ProtectedRoutes';

function App() {

  const currentUser = useCurrentUser();

  const [ isLoggedIn, setIsLoggedIn ] = useState(!!currentUser);

  return (
    <div className={styles.App}>
      <Switch>
      <Route exact path="/signin" render={() => <SignInPage setIsLoggedIn={setIsLoggedIn} /> } />
      <Route exact path="/signup" render={() => <SignUpPage /> } />

        <ProtectedRoutes isLoggedIn={isLoggedIn}>
          <Route exact path="/" render={() => <MainPageContainer tasksTodayPage />} />
          <Route exact path="/profile/:id" render={() => <MainPageContainer profile /> } />
          <Route exact path="/all-todos" render={() => <MainPageContainer allTodoTasksPage />} />
          <Route exact path="/overdue-tasks" render={() => <MainPageContainer overdueTasksPage />} />
          <Route exact path="/categories/:id" render={() => <MainPageContainer tasksByCategoryPage />} />
          <Route exact path="/shared-tasks" render={() => <MainPageContainer sharedTasksPage /> } />
          <Route exact path="/completed-tasks" render={() => <MainPageContainer completedTasksPage /> }/>
          <Route exact path="/task/:id" render={() => <MainPageContainer taskDetailsPage />} />
          <Route exact path="/tasks/:due_date" render={() => <MainPageContainer tasksPerDatePage />} />
          <Route render={() => <h1>Page Not Found</h1>}/>
        </ProtectedRoutes>
      </Switch>
    </div>
  );
}

export default App;
