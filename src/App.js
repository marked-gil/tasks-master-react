import styles from './App.module.css';
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <SideBar />
    </div>
  );
}

export default App;
