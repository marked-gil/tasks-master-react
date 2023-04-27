import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainPageContainer from './pages/MainPageContainer';
import styles from './App.module.css';
import { ProtectedRoute } from './pages/auth/ProtectedRoute';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  
  const currentUser = useCurrentUser();
  const isLoggedIn = !!localStorage.getItem("refreshTokenTimestamp") || !!currentUser

  return (
    <div className={styles.App}>
      <Switch>
        <Route 
          exact 
          path="/signin" 
          render={() => <SignInPage /> } 
        />
        <Route exact path="/signup" render={() => <SignUpPage /> } />

        <ProtectedRoute 
          exact 
          path="/" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer tasksTodayPage />} 
        />
        <ProtectedRoute 
          exact 
          path="/profile/:id" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer profile /> } 
        />
        <ProtectedRoute 
          exact 
          path="/all-todos" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer allTodoTasksPage />} 
        />
        <ProtectedRoute 
          exact 
          path="/overdue-tasks" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer overdueTasksPage />}
        />
        <ProtectedRoute 
          exact 
          path="/categories/:id" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer tasksByCategoryPage />} 
        />
        <ProtectedRoute 
          exact 
          path="/shared-tasks"
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer sharedTasksPage /> } 
        />
        <ProtectedRoute 
          exact 
          path="/completed-tasks" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer completedTasksPage /> } 
        />
        <ProtectedRoute 
          exact 
          path="/task/:id" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer taskDetailsPage />} 
        />
        <ProtectedRoute 
          exact 
          path="/tasks/:due_date" 
          isLoggedIn={isLoggedIn} 
          render={() => <MainPageContainer tasksPerDatePage />} 
        />
        <ProtectedRoute 
          exact
          path="/search-results"
          isLoggedIn={isLoggedIn}
          render={() => <MainPageContainer searchResultsPage /> }
        />
        <Route render={() => <MainPageContainer pageNotFoundPage /> } />
      </Switch>
    </div>
  );
}

export default App;
