import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar'
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainContent from './pages/MainContent';

function App() {
  return (
    <div className={styles.App}>
      {/* <SignInPage /> */}
      <SignUpPage />
      {/* <NavBar />
      <MainContent />
      <Footer /> */}
    </div>
  );
}

export default App;
