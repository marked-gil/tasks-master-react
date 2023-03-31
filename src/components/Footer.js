import React from 'react';
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.Footer}>
      <p>For Educational Purposes Only.</p>
      <p>2023 - Tasks Master</p>          
      <ul style={{color:'blue'}}>
        <li>Facebook</li>
        <li>Twitter</li>
        <li>Youtube</li>
        <li>Instagram</li>
        <li>LinkedIn</li>
      </ul>
    </footer>
  )
}

export default Footer