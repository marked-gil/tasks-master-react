import moment from 'moment';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchCard({ task, TitleStyle, TextStyle }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className={TitleStyle}>
          <Link to={`task/${task.id}`}>{task.task_name}</Link>
        </Card.Title>
        <Card.Text className={TextStyle}>{task.details}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex gap-3 pt-1 pb-1">
          <p className="mb-0"><i className="fa-solid fa-at fa-sm"></i>{task.owner}</p>
          <p className="mb-0">category: <span style={{ textTransform:"uppercase" }}>{task.category}</span></p>
          {!!task.shared_to.length && <p className="mb-0"><i class="fa-solid fa-link fa-sm"></i>Shared</p>}
          <p className="mb-0 ms-auto">created <span>{moment(task.datetime_created, "DD MMM YYYY | HH:mm").fromNow()}</span></p>
      </Card.Footer>
    </Card>
  )
};

export default SearchCard;