import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { useHistory } from 'react-router-dom';


function DatePickerComponent({ toggleMenu }) {

  const history = useHistory();
  const [ tasksDate, setTasksDate ] = useState(null);

  const handleDateSelection = () => {
    if (tasksDate) {
      history.push(`/tasks/${moment(tasksDate).format('YYYY-MM-DD')}`);
      toggleMenu && toggleMenu();
    }
  };

  return (
    <>
      <DatePicker
        className={`me-2`}
        label="Find Tasks by Date"
        value={tasksDate} 
        onChange={newValue => setTasksDate(newValue)}
        slotProps={{
          textField: {
            size: 'small',
            variant: 'filled',
            fullWidth: true,
          },
        }}
        desktopModeMediaQuery="(min-width: 992px)"
      />
      <Button onClick={handleDateSelection}>Go</Button>
    </>
  )
}

export default DatePickerComponent;