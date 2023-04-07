import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import './api/axiosDefaults';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainContent from './pages/MainContent';
import styles from './App.module.css';

function App() {

  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/" render={() => <MainContent tasksTodayPage />} />
        <Route exact path="/signin" render={() => <SignInPage /> } />
        <Route exact path="/signup" render={() => <SignUpPage /> } />
        <Route exact path="/profile/:id" render={() => <MainContent profile /> } />
        <Route exact path="/task/:id" render={() => <MainContent taskDetailsPage />} />
        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;
