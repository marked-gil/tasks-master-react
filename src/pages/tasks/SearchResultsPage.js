import React from 'react';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/SearchResultsPage.module.css';
import SearchCard from '../../components/SearchCard';
import LoadingIcon from '../../components/LoadingIcon';

function SearchResultsPage({ searchResults, keywordSearched, isLoaded }) {

  const hasReturnedResults = searchResults.results.length

  return (
    <Col className={styles.SearchResultsPage}>
      {!isLoaded && <LoadingIcon size="6" />}
      <div className={styles.InnerContainer}>
        <h2>Search Results</h2>
        <p className="mt-4">keyword searched: <span className="ms-2">{keywordSearched}</span></p>

        <hr />

        {searchResults.results.map((task) => (
          <SearchCard
            key={task.id}
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