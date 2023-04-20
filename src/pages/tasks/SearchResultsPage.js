import React from 'react';
import { Col } from 'react-bootstrap';
import styles from '../../styles/SearchResultsPage.module.css';
import SearchCard from '../../components/SearchCard';

function SearchResultsPage({ searchResults }) {

  console.log("results", searchResults)
  return (
    <Col className={styles.SearchResultsPage}>
      <div className={styles.InnerContainer}>
        <h2>Search Results:</h2>
        {searchResults.results.map((task, idx) => (
          <SearchCard
            key={idx}
            task={task} 
            TitleStyle={styles.TaskTitle} 
            TextStyle={styles.TaskDescription} 
          />
        ))}
      </div>
    </Col>
  )
};

export default SearchResultsPage;