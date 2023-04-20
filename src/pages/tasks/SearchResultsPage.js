import React from 'react';
import { Col } from 'react-bootstrap';
import styles from '../../styles/SearchResultsPage.module.css';

function SearchResultsPage() {
  return (
    <Col className={styles.SearchResultsPage}>
      <div className={styles.InnerContainer}>
        <h2>Search Results:</h2>
        
      </div>
    </Col>
  )
};

export default SearchResultsPage;