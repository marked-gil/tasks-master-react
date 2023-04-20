import React from 'react';
import { Col } from 'react-bootstrap';
import styles from '../../styles/SearchResultsPage.module.css';
import SearchCard from '../../components/SearchCard';

function SearchResultsPage({ searchResults, keywordSearched }) {

  const hasReturnedResults = searchResults.results.length

  return (
    <Col className={styles.SearchResultsPage}>
      <div className={styles.InnerContainer}>
        <h2>Search Results</h2>
        <p>keyword searched: <span className="ms-2">{keywordSearched}</span></p>
        {searchResults.results.map((task, idx) => (
          <SearchCard
            key={idx}
            task={task} 
            TitleStyle={styles.TaskTitle} 
            TextStyle={styles.TaskDescription} 
          />
        ))}

        {!hasReturnedResults &&
          <p className={`mt-5 ${styles.NoResults}`}>No results found.</p>
        }
      </div>
    </Col>
  )
};

export default SearchResultsPage;