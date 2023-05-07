import { axiosReq } from '../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


function UserSharingPopover({ children, taskData, setTaskData, sharingUser, setError }) {

  const {
    id, 
    shared_to
  } = taskData;

  const removeUserFromTask = async () => {
    const usersLeft = shared_to.filter(user => user !== sharingUser)
    try {
      if (usersLeft.length === 0) {
        const { data } = await axiosReq.put(`/tasks/${id}`, {
          ...taskData, "is_shared": false, "shared_to": usersLeft
        })
        setTaskData(data)
      } else {
        const { data } = await axiosReq.put(`/tasks/${id}`, {
          ...taskData, "shared_to": usersLeft
        })
        setTaskData(data)
      }
    } catch (err) {
      setError("An error occurred while removing the user. Try again later.")
    }
  }

  const popover = (
    <Popover id="users-sharing-popover">
      <Popover.Body className="p-2 d-flex flex-column">
        <p className="mb-0">Want to remove user?</p>
        <Button onClick={removeUserFromTask} className="me-1" variant="danger" size="sm">Remove</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover}>
      { children }
    </OverlayTrigger>  )
}

export default UserSharingPopover;