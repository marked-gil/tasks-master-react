import { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import CategorySelect from '../../components/CategorySelect';
import LoadingIcon from '../../components/LoadingIcon';
import styles from '../../styles/AddTask.module.css';

function AddTask(props) {

  const { 
    className, 
    task_date, 
    tasks, 
    setTasks, 
    categories, 
    setFeedbackMessage, 
    allTodos, 
    pushToPage,
    setError,
    toggleMenu,
    setEditCategory
  } = props;

  const initialTaskData = { 
    task_name: "",
    details: "",
    category: "",
  };

  const history = useHistory();
  const [ taskData, setTaskData ] = useState(initialTaskData);
  const [ dueDate, setDueDate ] = useState({due_date: "" });
  const [ dueTime, setDueTime ] = useState({due_time: ""});
  const [ priorityLevel, setPriorityLevel ] = useState({priority: 1});
  const [ showErrors, setShowErrors ] = useState({});
  const [ show, setShow ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(true);

  const { task_name, details, category } = taskData;
  const { due_date } = dueDate;
  const { due_time } = dueTime;
  const { priority } = priorityLevel;

  const handleClose = () => {
    setShow(false);
    setTaskData(initialTaskData);
    setDueDate({due_date: ""});
    setDueTime({due_time: ""});
    setPriorityLevel({priority: 1});
    setShowErrors({});
  };

  const handleShow = () => {
    setShow(true);
    setFeedbackMessage && setFeedbackMessage("");
    setError && setError("");
    setEditCategory && setEditCategory(false);
  };

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setDueDate({
      [event.target.name]: moment(event.target.value).format("YYYY-MM-DD")
    });
  };

  const handleTimeChange = (event) => {
    setDueTime({
      [event.target.name]: event.target.value
    })
  }

  const handlePriorityChange = (event) => {
    setPriorityLevel({
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    const success_message = `Task has been successfully added for ${
      moment(due_date).format("Do MMMM YYYY")}.`
    try {
      setIsLoaded(false);
      const { data } = await axiosReq.post("/tasks/", {...taskData, due_date, due_time, priority});
      handleClose();
      setFeedbackMessage && setFeedbackMessage(success_message)
      if (task_date === moment(due_date).format("YYYY-MM-DD") || 
          (allTodos && moment(due_date).format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD"))) {
        setTasks({results: [...tasks.results, data]});
      }
      setIsLoaded(true);
      pushToPage && history.push(`/tasks/${moment(due_date).format("YYYY-MM-DD")}`)
      toggleMenu && toggleMenu();
    } catch (err) {
      setShowErrors(err.response?.data);
      setIsLoaded(true);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={className}>
      <i className="fa-solid fa-plus"></i> Add Task
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body className="position-relative">
          {!isLoaded && <LoadingIcon size="6" />}

          {showErrors.length && 
            <Alert variant="danger">Submission Failed! Try again.</Alert> 
          }

          <Form>
            {/* TASK NAME */}
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Control
                type="text"
                placeholder="Task Name"
                autoFocus
                maxLength={150}
                className={styles.TaskName}
                name="task_name"
                value={task_name}
                onChange={handleChange}
                aria-label="Add the task's name"
              />
              {/* Error Feedback */}
              {showErrors?.task_name?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error === 'This field must be unique for the "due_date" date.'
                  ? "Task with the same name already exists for this date."
                  : error
                }
                </Alert>
                ))
              }
            </Form.Group>

            {/* TASK DETAILS */}
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Control
                as="textarea" 
                rows={3} 
                name="details"
                value={details}
                placeholder="Description" 
                maxLength={1000}
                onChange={handleChange}
                aria-label="Add the task's description or details"
              />
              {/* Error Feedback */}
              {showErrors?.details?.map((error, idx) => (
                <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                  {error}
                </Alert>
                ))
              }
            </Form.Group>

            <div className={`${styles.AttributesContainer}`}>
              {/* CATEGORY SELECTION */}
              <CategorySelect
                className={styles.CategorySelect}
                category={category}
                handleChange={handleChange}
                categories={categories}
                errors={showErrors}
              />
              <div className={`${styles.InnerContainer}`}>
                {/* DUE DATE */}
                <Form.Group className={`${styles.DueDateFormGroup}`}>
                  <Form.Label htmlFor="due_date">Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    id="due_date"
                    name="due_date"
                    onChange={handleDateChange}
                    size="sm"
                    aria-label="Add tasks due date"
                  />
                  {/* Error Feedback */}
                  {showErrors?.due_date?.map((error, idx) => (
                    <Alert className={`mt-1 mb-0 pb-0 pt-0 ${styles.TextCenter}`} key={idx} variant="danger">
                      {
                        error === "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
                        ? "You need to provide a due date."
                        : error
                      }
                    </Alert>
                    ))
                  }
                </Form.Group>
                
                {/* DUE TIME */}
                <Form.Group className={`${styles.DueTimeFormGroup}`}>
                  <Form.Label htmlFor="due_time">Due Time</Form.Label>
                  <Form.Control
                    type="time"
                    id="due_time"
                    name="due_time"
                    value={due_time}
                    onChange={handleTimeChange}
                    size="sm"
                    aria-label="Add task's due time"
                  />
                </Form.Group>
                
                {/* PRIORITY */}
                <Form.Group className={styles.PriorityFormGroup}>
                  <Form.Label htmlFor="priority">Priority</Form.Label>
                  <Form.Select
                    id="priority"
                    name="priority"
                    defaultValue={priority}
                    onChange={handlePriorityChange}
                    size="sm" 
                    aria-label="Select a priority level"
                  >
                    <option value="" disabled>Select Priority Level</option>
                    {[{Low: 1}, {Medium: 2}, {High: 3}].map(level => (
                      <option value={Object.values(level)[0]} key={Object.values(level)[0]}>
                        {Object.keys(level)[0]}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="sm">
            cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} className={styles.AddButton}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTask;