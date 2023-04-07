import { Redirect, Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import moment from 'moment';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainPageContainer from './pages/MainPageContainer';
import styles from './App.module.css';

function App() {

  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/" render={() => <MainPageContainer tasksTodayPage />} />
        <Route exact path="/signin" render={() => <SignInPage /> } />
        <Route exact path="/signup" render={() => <SignUpPage /> } />
        <Route exact path="/profile/:id" render={() => <MainPageContainer profile /> } />
        <Route exact path="/task/:id" render={() => <MainPageContainer taskDetailsPage />} />
        <Route exact path="/tasks/:due_date" render={() => <MainPageContainer tasksPerDatePage />} />
        {/* <Route exact path={`/tasks/:${moment().add(1, 'days').format('YYYY-MM-DD')}`} render={() => <MainPageContainer tasksPerDatePage />} /> */}
        {/* <Route exact path={`/tasks/:${moment().format('YYYY-MM-DD')}`} render={() => <MainPageContainer tasksPerDatePage />} /> */}
        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;
