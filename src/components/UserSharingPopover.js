import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

function UserSharingPopover({ children }) {

  const handleDelete = () => {
    console.log("event")
  }

  const popover = (
    <Popover id="users-sharing-popover">
      <Popover.Body className="p-2 d-flex flex-column">
        <p className="mb-0">Want to remove user?</p>
        <Button onClick={handleDelete} className="me-1" variant="danger" size="sm">Remove</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover}>
      { children }
    </OverlayTrigger>  )
};

export default UserSharingPopover;