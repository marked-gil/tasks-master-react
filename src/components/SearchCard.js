import React from 'react';
import { Card } from 'react-bootstrap';

function SearchCard({ TitleStyle, TextStyle }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className={TitleStyle}>Task Name will be here</Card.Title>
        <Card.Text className={TextStyle}>Description of the task alksjd askjdaksjbdkjasbd alskdjaskld cabjsdnkasjdhak asdas asdasdasd</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex gap-3">
          <p className="mb-0">Owner: <span>username</span></p>
          <p className="mb-0">Shared</p>
          <p className="mb-0">Created: <span>date</span></p>
      </Card.Footer>
    </Card>
  )
};

export default SearchCard;