import React from 'react';
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.Footer}>
      <p className="mb-0">For Educational Purposes Only.</p>
      <p className="mb-0"><i class="fa-sharp fa-regular fa-copyright"></i> 2023 - Tasks Master</p>          
      <ul className="d-none d-lg-flex justify-content-between align-items-center ps-0 mb-0">
        <li>
          <a href="https://www.facebook.com/" className={styles.icons} target="_blank" rel="noreferrer" aria-label="Open Facebook page in a new tab">
            <i class="fa-brands fa-square-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" className={styles.icons} target="_blank" rel="noreferrer" aria-label="Open Twitter page in a new tab">
            <i class="fa-brands fa-square-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/" className={styles.icons} target="_blank" rel="noreferrer" aria-label="Open Youtube channel in a new tab">
            <i class="fa-brands fa-square-youtube"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/" className={styles.icons} target="_blank" rel="noreferrer" aria-label="Open Instagram page in a new tab">
            <i class="fa-brands fa-square-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/mark-gil-dacutan-65863432/" className={styles.icons} target="_blank" rel="noreferrer" aria-label="Open LinkedIn page in a new tab">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer