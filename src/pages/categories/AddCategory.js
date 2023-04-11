import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function AddCategory() {

  const initialCategoryData = { 
    category_name: "",
    description: "",
  };

  const [ show, setShow ] = useState(false);
  const [ categoryData, setCategoryData ] = useState(initialCategoryData);

  const { category_name, description } = categoryData;

  const handleClose = () => {
    setShow(false)
  }

  const handleChange = (event) => {
    setCategoryData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    console.log("submitted");
    try {
      const { data } = await axios.post("/categories/", {...categoryData});
      handleClose();
      console.log("cat added:", data)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={setShow} size="sm">
      <i className="fa-solid fa-plus"></i> Add Category
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ps-3">Add Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="ps-3 pe-3">
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Control
                type="text"
                placeholder="Category Name"
                autoFocus
                maxLength={50}
                // className={styles.TaskName}
                name="category_name"
                value={category_name}
                onChange={handleChange}
                aria-label="Add the category name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="categoryDescription">
              <Form.Control
                as="textarea" 
                rows={3} 
                name="description"
                value={description}
                placeholder="Description"
                maxLength={100}
                onChange={handleChange}
                aria-label="Add the category's description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCategory;