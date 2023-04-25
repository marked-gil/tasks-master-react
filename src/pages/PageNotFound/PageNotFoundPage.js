import React from 'react';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/PageNotFoundPage.module.css';
import icon from '../../assets/404-error.png';


function PageNotFoundPage() {
  return (
    <Col className={styles.PageNotFoundPage}>
      <h2 className={styles.HeadingPageNotFound}>Page Not Found</h2>
      <img src={icon} alt="Page Not Found Icon" className={styles.Icon}/>
    </Col>
  )
};

export default PageNotFoundPage;