import Col from 'react-bootstrap/Col';
import styles from '../../styles/SearchResultsPage.module.css';
import SearchCard from '../../components/SearchCard';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorDisplay from '../../components/ErrorDisplay';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';

function SearchResultsPage(props) {

  const { 
    setSearchResults, 
    searchResults, 
    keywordSearched, 
    isLoaded, 
    error 
  } = props;

  const hasReturnedResults = searchResults.results.length

  return (
    <Col className={styles.SearchResultsPage}>
      {!isLoaded && <LoadingIcon size="6" />}
      <div className={styles.InnerContainer}>
        {error && <ErrorDisplay error={error} />}
        <h2 className={styles.HeadingSearchResults}>Search Results</h2>
        <p className="mt-4">keyword searched: <span className="ms-2">{keywordSearched}</span></p>

        <hr />
    
        <div id="scrollableResultsContainer" className={styles.ResultsContainer}>
          <InfiniteScroll
            scrollableTarget="scrollableResultsContainer"
            children={searchResults.results.map((task) => (
              <SearchCard
                key={task.id}
                task={task} 
                TitleStyle={styles.TaskTitle} 
                TextStyle={styles.TaskDescription} 
              />
            ))}
            dataLength={searchResults.results.length}
            loader={<LoadingIcon />}
            hasMore={!!searchResults.next}
            next={() => fetchMoreData(searchResults, setSearchResults)}
            endMessage={hasReturnedResults ? <p className="mt-4 mb-0 text-center">End of Results.</p> : ""}
          />
          
          {!hasReturnedResults &&
            <p className={`mt-5 ${styles.NoResults}`}>No results found.</p>
          }
        </div>
      </div>
    </Col>
  )
}

export default SearchResultsPage;