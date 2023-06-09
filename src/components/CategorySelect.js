import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';


function CategorySelect({ className, category, handleChange, categories, errors }) {
  return (
    <Form.Group className={className}>
      <Form.Label htmlFor="category">Category</Form.Label>
      <Form.Select
        id="category"
        name="category"
        defaultValue={category}
        onChange={handleChange}
        size="sm" 
        aria-label="Select task category"
        className="text-capitalize"
      >
        <option value="">Choose a category</option>
        {categories?.results.map((cat) => (
          <option value={cat.category_name} key={cat.category_name}>
            {cat.category_name}
          </option>
        ))}
      </Form.Select>

      {errors?.category?.map((error, idx) => (
        <Alert
          className={`mt-1 mb-0 pb-0 pt-0 text-center`} key={idx} variant="danger"
        >
          { 
            error === "This field may not be null."
            ? "You need to select a category."
            : error
          }
        </Alert>
        ))
      }
    </Form.Group>
  )
}

export default CategorySelect;