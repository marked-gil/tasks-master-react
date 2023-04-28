import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from '../../styles/EditTaskAttributes.module.css';
import moment from 'moment';


function EditTaskAttributes(props) {

  const {
    handleDataChange,
    category,
    categories,
    handleSave,
    due_date,
    due_time,
    priority,
    progress,
    closeAllEdits,
    setCloseAllEdits,
    is_owner
  } =props

  const [ editCategory, setEditCategory ] = useState(false);
  const [ editDuePriority, setEditDuePriority ] = useState(false);

  useEffect(() => {
    if (closeAllEdits) {
      setEditCategory(false);
      setEditDuePriority(false);
    }
    return setCloseAllEdits(false)
  }, [closeAllEdits, setCloseAllEdits])

  const cancelEditCategory = () => {
    setEditCategory(!editCategory);
  };

  const canceEditDuePriority = () => {
    setEditDuePriority(!editDuePriority);
  };

  const DueDateForm = <>
      {/* DUE DATE */}
      <Form.Group className={styles.DueDateForm}>
        <Form.Label htmlFor="due_date" className="mb-0">Due Date</Form.Label>
        <Form.Control
          type="date"
          id="due_date"
          name="due_date"
          value={due_date}
          onChange={handleDataChange}
          size="sm"
          aria-label="Select a due date"
        />

        {/* {errors.due_date?.map((error, idx) => (
          <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
            {
              error === "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
              ? "You need to provide a due date."
              : error
            }
          </Alert>
          ))
        } */}
      </Form.Group>
    </>
  
  const DueTimeForm = <>
      {/* DUE TIME */}
      <Form.Group>
        <Form.Label htmlFor="due_time" className="mb-0">Due Time</Form.Label>
        <Form.Control
          type="time"
          id="due_time"
          name="due_time"
          value={due_time}
          onChange={handleDataChange}
          size="sm"
          aria-label="Select a due time"
        />
      </Form.Group>
    </>
  
  const PriorityForm = <>
      {/* PRIORITY */}
      <Form.Group className={`align-self-center mb-3 ${styles.PriorityForm}`}>
        <Form.Label htmlFor="priority" className="mb-0">Priority</Form.Label>
        <Form.Select
          id="priority"
          name="priority"
          defaultValue={priority}
          onChange={handleDataChange}
          aria-label="Select a priority level"
          size="sm"
        >
          <option value="" disabled>Select Priority Level</option>
          {[{Low: 1}, {Medium: 2}, {High: 3}].map(level => (
            <option value={Object.values(level)[0]} key={Object.values(level)[0]}>
              {Object.keys(level)[0]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  
  const CategoryForm = <>
      {/* CATEGORIES */}
      <div className="d-flex">
        <Form.Select
          className={`text-capitalize ${styles.EditFormSelect}`}
          aria-label="Select category"
          name="category"
          defaultValue={category}
          onChange={handleDataChange}
        >
          <option value="" disabled>Choose your category</option>
          {categories.results.map((cat) => (
            <option
              value={cat.category_name}
              key={cat.category_name}
            >
              {cat.category_name}
            </option>
            ))
          }
        </Form.Select>
      </div>
    </>

  return (
    <>
      <div className="d-flex flex-column mt-3 mb-4">
          {/* CATEGORY */}
          <div className={`${styles.CategoryContainer}`}>
            <span className={`${styles.LabelCategory}`}>Category:</span>
            { editCategory && CategoryForm }
            { !editCategory && <span className={styles.CategoryName}>{category}</span> }

            { editCategory &&
              <div className={`${styles.CategoryButtons}`}>
                <Button onClick={cancelEditCategory} variant="link" className="ms-3 p-0">
                  cancel
                </Button>
                <Button variant="link" onClick={handleSave} className={`m2-3 p-0 ${styles.bold}`}>
                  SAVE
                </Button> 
              </div>
            }
            { is_owner && !editCategory && 
              <Button variant="link" onClick={setEditCategory} className="ms-auto p-0">edit</Button> 
            }
          </div>

          {/* DUE DATETIME | PRIORITY | PROGRESS */}
          <div className={`d-flex justify-content-between mb-0 ${styles.DateTimePriorityContainer}`}>
            <div className={`d-flex`}>
              { editDuePriority && DueDateForm }
              { editDuePriority && DueTimeForm }
              { editDuePriority && PriorityForm }

              { !editDuePriority &&
                <div className="d-flex gap-1">
                  <p className="mb-0">
                    <span className={styles.LabelDue}>Due:</span>
                    <span className={`${styles.DueDateTime} ${styles.bold}`}>
                      {moment(due_date).format("DD MMMM YYYY")} {due_time ? `- ${due_time}` : ""}
                    </span>
                  </p> | 
                  <span className={`${styles.Priority} ${priority === 3 ? styles.High : ""}`}>
                    {priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}
                  </span> | 
                  <span className={`${styles.Progress} ${progress === "overdue" ? styles.Overdue : ""}`}>
                    {progress}
                  </span>
                </div>
              }  
            </div>

            { editDuePriority &&
              <div className={`${styles.EditButtonsTwo}`}>
                <Button onClick={canceEditDuePriority} variant="link" className="ms-3 p-0">cancel</Button>
                <Button onClick={handleSave} variant="link" className={`ms-2 p-0 ${styles.bold}`}>SAVE</Button>
              </div>}
            { is_owner && !editDuePriority &&
              <Button onClick={setEditDuePriority} variant="link" className={`ms-3 p-0 ${styles.AttributesEditButton}`}>edit</Button> }
          </div>
      </div>
    </>
  )
}

export default EditTaskAttributes;