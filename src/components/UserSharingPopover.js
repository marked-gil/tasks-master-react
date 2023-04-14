import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';

function UserSharingPopover({ children, taskData, setTaskData, sharingUser }) {

  const {
    id, 
    shared_to
  } = taskData;

  const removeUserFromTask = async () => {
    const usersLeft = shared_to.filter(user => user !== sharingUser)
    console.log(usersLeft)
    try {
      const { data } = await axiosReq.put(`/tasks/${id}`, {
        ...taskData, "shared_to": usersLeft
      })
      setTaskData(data)
    } catch (err) {
      console.log(err.response?.data)
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
};

export default UserSharingPopover;