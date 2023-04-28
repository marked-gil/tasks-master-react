import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/EditTaskAttributes.module.css';
import moment from 'moment';


function EditTaskAttributes(props) {

  const {
    taskData,
    categories,
    handleAttributesUpdate,
    closeAllEdits,
    setCloseAllEdits,
    is_owner
  } =props

  const [ showForms, setShowForms ] = useState(false);
  const [ newTaskData, setNewTaskData ] = useState(taskData);

  const {
    category,
    due_date,
    due_time,
    priority,
    progress
  } = newTaskData;

  useEffect(() => {
    setNewTaskData(taskData);
  }, [taskData]);

  useEffect(() => {
    if (closeAllEdits) {
      setShowForms(false);
    }
    return setCloseAllEdits(false)
  }, [closeAllEdits, setCloseAllEdits])

  const handleCancelEdit = () => {
    setNewTaskData(taskData);
    setShowForms(false);
  }

  const handleDataChange = (event) => {
    setNewTaskData(prevState => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ))
  };

  const handleUpdate = () => {
    handleAttributesUpdate(newTaskData);
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
      {/* 
        {errors.due_date?.map((error, idx) => (
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
      <Form.Group className={`align-self-center ${styles.PriorityForm}`}>
        <Form.Label htmlFor="priority" className="mb-0">Priority</Form.Label>
        <Form.Select
          id="priority"
          name="priority"
          value={priority}
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
          value={category}
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
      <div className={styles.MainContainer}>

        {/* CATEGORY */}
        <div className={`${styles.CategoryContainer}`}>
          <span className={`${styles.LabelCategory}`}>Category:</span>

          {!showForms && <span className={styles.CategoryName}>{category}</span> }

          {showForms && CategoryForm}
        </div>

          {/* DUE DATETIME | PRIORITY | PROGRESS */}
          <div className={styles.DateTimePriorityContainer}>
            {!showForms && 
              <div>
                <p className={`mb-0`}>
                  <span className={styles.LabelDue}>Due:</span>
                  <span className={`${styles.DueDateTime} ${styles.bold}`}>
                    {moment(due_date).format("DD MMMM YYYY")} {due_time ? `- ${due_time}` : ""}
                  </span>
                </p> 
                <p className={styles.PriorityProgressGroup}>
                  <span className={`${styles.Priority} ${newTaskData.priority === 3 ? styles.High : ""}`}>
                    {priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}
                  </span> 
                  <span className={styles.VerticalLine}> | </span>
                  <span className={`${styles.Progress} ${progress === "overdue" ? styles.Overdue : ""}`}>
                    {progress}
                  </span>
                </p>
              </div>
            }

            {showForms && 
              <div className={styles.EditFormsInnerBox}>
                { DueDateForm }
                { DueTimeForm }
                { PriorityForm }
              </div>
            }

            { showForms &&
              <div className={`${styles.EditButtonsTwo}`}>
                <Button onClick={handleCancelEdit} variant="link" className="ms-3 p-0">cancel</Button>
                <Button onClick={handleUpdate} variant="link" className={styles.SaveButton}>SAVE</Button>
              </div>}
            { is_owner && !showForms &&
              <Button 
                onClick={setShowForms} 
                variant="link" 
                className={styles.AttributesEditButton}
              >
                edit
              </Button>
            }
          </div>
      </div>
    </>
  )
}

export default EditTaskAttributes;