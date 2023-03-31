import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <SideBar />
      <Footer />
    </div>
  );
}

export default App;
