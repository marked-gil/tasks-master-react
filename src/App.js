import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar'
import MainContent from './pages/MainContent';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
