import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainPageContainer from './pages/MainPageContainer';
import styles from './App.module.css';
import { ProtectedRoute } from './pages/auth/ProtectedRoute';
import { useState } from 'react';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/signin" render={() => <SignInPage setIsLoggedIn={setIsLoggedIn} /> } />
        <Route exact path="/signup" render={() => <SignUpPage /> } />

        <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn} render={() => <MainPageContainer tasksTodayPage />} />
        <ProtectedRoute exact path="/profile/:id" isLoggedIn={isLoggedIn} render={() => <MainPageContainer profile /> } />
        <ProtectedRoute exact path="/all-todos" render={() => <MainPageContainer allTodoTasksPage />} />
        <ProtectedRoute exact path="/overdue-tasks" render={() => <MainPageContainer overdueTasksPage />}/>
        <ProtectedRoute exact path="/categories/:id" render={() => <MainPageContainer tasksByCategoryPage />} />
        <ProtectedRoute exact path="/shared-tasks" render={() => <MainPageContainer sharedTasksPage /> } />
        <ProtectedRoute exact path="/completed-tasks" render={() => <MainPageContainer completedTasksPage /> } />
        <ProtectedRoute exact path="/task/:id" render={() => <MainPageContainer taskDetailsPage />} />
        <ProtectedRoute exact path="/tasks/:due_date" render={() => <MainPageContainer tasksPerDatePage />} />

        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;
