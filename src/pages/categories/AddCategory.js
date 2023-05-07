import { useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/AddCategory.module.css';
import LoadingIcon from '../../components/LoadingIcon';
import { useHistory } from 'react-router-dom';

// Component for adding new category
function AddCategory(props) {

  const { 
    currentUser, 
    categories, 
    setCategories, 
    handleChangeInCategory,
    className,
    toggleMenu 
  } = props;

  const history = useHistory();
  const initialCategoryData = {
    category_name: "",
    description: "",
  };

  const [ show, setShow ] = useState(false);
  const [ categoryData, setCategoryData ] = useState(initialCategoryData);
  const { category_name, description } = categoryData;
  const [ isLoaded , setIsLoaded ] = useState(true);
  const [ errors, setErrors ] = useState({});

  const handleClose = () => {
    setShow(false); 
    setCategoryData(initialCategoryData);
    setErrors({});
  }

  const handleChange = (event) => {
    setCategoryData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsLoaded(false);
    const newData = {
      owner: currentUser?.pk,
      category_name: categoryData.category_name.toLocaleLowerCase(),
      description: categoryData.description
    }

    try {
      const { data } = await axios.post("/categories/", {...newData});
      setTimeout(() => {
        setCategories({results: [...categories.results, data]})
        handleChangeInCategory();
        handleClose();
        toggleMenu && toggleMenu();
        history.push(`/categories/${data.id}`);
        setIsLoaded(true);
      }, 500)
    } catch (err) {
      setErrors(err.response?.data);
      setIsLoaded(true);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={setShow} className={className}>
        <i className="fa-solid fa-plus"></i> Add Category
      </Button>

      <Modal size="md" show={show} onHide={handleClose}>
        {!isLoaded && <LoadingIcon size="5" />}
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
                className={styles.CategoryName}
                name="category_name"
                value={category_name}
                onChange={handleChange}
                aria-label="Add the category name"
              />
              {errors?.category_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error === "This field may not be blank."
                    ? "Category Name is required."
                    : error
                  }
                </Alert>
                ))
              }
              {errors?.non_field_errors?.map((error, idx) => (
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
                aria-label="Add the category's description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} style={{ width: "8rem" }}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCategory;