import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';

function SearchForm({ setSearchResults, setKeywordSearched }) {

  const history = useHistory();
  const [ searchKey, setSearchKey ] = useState("");

  const handleChange = (event) => {
    setSearchKey(event.target.value)
  };

  const handleSubmit = async() => {

    if (searchKey) {
      try {
        const { data } = await axiosReq.get(`/tasks/?search=${searchKey}`);
        setSearchResults(data);
        setKeywordSearched(searchKey);
        history.push("/search-results");
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Task or Category"
        className="me-2"
        aria-label="Search"
        name="search"
        onChange={handleChange}
      />
      <Button 
        variant="outline-success" 
        style={{ color:"white" }}
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Form>
  )
};

export default SearchForm;