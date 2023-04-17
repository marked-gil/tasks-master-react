import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import LoadingIcon from '../../components/LoadingIcon';
import styles from '../../styles/EditCategory.module.css';

function EditCategory({ id, className, categoryData, setCategoryData }) {

  const { category_name, description } = categoryData;

  const [ show, setShow ] = useState(false);
  const [ isLoaded , setIsLoaded ] = useState(true);
  const [ errors, setErrors ] = useState({});

  const handleClose = () => {
    setShow(false);
    setErrors({});
  }

  const handleChange = (event) => {
    setCategoryData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoaded(false);
      const { data } = await axiosReq.put(`categories/${id}`, {...categoryData});
      setCategoryData(data)
      handleClose();
      setIsLoaded(true);
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err.response)
      setIsLoaded(true);
    }
  }

  return (
    <>
      <Button 
        onClick={setShow} 
        variant="primary" 
        size="sm" 
        className={className} 
        style={{width:"5rem", height: "2rem"}}
      >
        Edit
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        {!isLoaded && <LoadingIcon size="5" />}
        <Modal.Header closeButton>
          <Modal.Title className="ps-3">Update Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="ps-3 pe-3">
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Control
                type="text"
                placeholder="Category Name"
                autoFocus
                maxLength={50}
                className={styles.CategoryName}
                name="category_name"
                value={category_name}
                onChange={handleChange}
                aria-label="Update the category name"
              />
              {errors.category_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error === "This field may not be blank."
                    ? "Category Name is required."
                    : error
                  }
                </Alert>
                ))
              }
              {errors.non_field_errors?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  { error }
                </Alert>
                ))
              }
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
                aria-label="Update the category's description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditCategory;