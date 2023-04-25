import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';

function SearchForm(props) {

  const { 
    setSearchResults, 
    setKeywordSearched, 
    className, 
    setIsLoaded 
  } = props;

  const history = useHistory();
  const [ searchKey, setSearchKey ] = useState("");

  const handleChange = (event) => {
    setSearchKey(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if (searchKey) {
      try {
        const { data } = await axiosReq.get(`/tasks/?search=${searchKey}`);
        setSearchResults(data);
        setKeywordSearched(searchKey);
        setIsLoaded(true);
        setSearchKey("");
        history.push("/search-results");
      } catch (err) {
        console.log(err.response);
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
        style={{ color:"white" }}
      >
        Search
      </Button>
    </Form>
  )
};

export default SearchForm;