import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainContent from './pages/MainContent';
import styles from './App.module.css';
import { useContext } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';


function App() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/" render={() => <h1>Home</h1>} />
        <Route exact path="/signin" render={() => <SignInPage /> } />
        <Route exact path="/signup" render={() => <SignUpPage /> } />
        <Route exact path="/profile/:id" render={() => <MainContent profile /> } />
        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;
