import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosReq } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import styles from '../styles/SearchForm.module.css';

// Component that renders the search bar
function SearchForm(props) {

  const { 
    setSearchResults, 
    setKeywordSearched, 
    className, 
    setIsLoaded,
    toggleMenu,
    setError
  } = props;

  const history = useHistory();
  const [ searchKey, setSearchKey ] = useState("");

  const handleChange = (event) => {
    setSearchKey(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if (searchKey) {
      toggleMenu && toggleMenu();
      try {
        const { data } = await axiosReq.get(`/tasks/?search=${searchKey}`);
        setSearchResults(data);
        setKeywordSearched(searchKey);
        setIsLoaded(true);
        setSearchKey("");
        history.push("/search-results");
      } catch (err) {
        setError("An Error has occurred while searching. Try again later.")
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <Form.Control
        type="search"
        placeholder="Task or Category"
        className="me-2"
        aria-label="Search"
        name="search"
        value={searchKey}
        onChange={handleChange}
      />
      <Button 
        type="submit"
        variant="outline-success" 
        className={styles.SearchButton}
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchForm;