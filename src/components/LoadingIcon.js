import React from 'react';
import spinner from '../assets/loading-spinner.svg';
import styles from '../styles/LoadingIcon.module.css';

function LoadingIcon({ size }) {
  return (
    <div className={styles.LoadingIcon}>
      <img src={spinner} alt="loading" style={{ width:`${size}rem`, height:`${size}rem` }} />
    </div>
  )
};

export default LoadingIcon;