import React from 'react';
import { Button, Form } from 'react-bootstrap';

function SearchForm() {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Task or Category"
        className="me-2"
        aria-label="Search"
        name="search"
      />
      <Button variant="outline-success" style={{ color:"white" }}>Search</Button>
    </Form>
  )
};

export default SearchForm;