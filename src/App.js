import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar'
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainContent from './pages/MainContent';

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/" render={() => <SignInPage /> } />
        <Route exact path="/signup" render={() => <SignUpPage /> } />
        <Route exact path="/profile" render={() => <MainContent /> } />
        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;
