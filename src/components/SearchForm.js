import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';

function SearchForm({ setSearchResults }) {

  const [ searchKey, setSearchKey ] = useState("");

  const handleChange = (event) => {
    setSearchKey(event.target.value)
  };

  const handleSubmit = async() => {
    try {
      const { data } = await axiosReq.get(`/tasks/?search=${searchKey}`)
      setSearchResults(data)
    } catch (err) {
      console.log(err.response)
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