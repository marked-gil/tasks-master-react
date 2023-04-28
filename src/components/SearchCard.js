import moment from 'moment';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/SearchCard.module.css';

function SearchCard({ task, TitleStyle, TextStyle }) {
  return (
    <Card className="mb-2">
      <Card.Body className={styles.CardBody}>
        <Card.Title className={TitleStyle}>
          <Link to={`task/${task.id}`}>{task.task_name}</Link>
        </Card.Title>
        <Card.Text className={TextStyle}>{task.details}</Card.Text>
        <p className={`text-muted ${styles.Category}`}>
          category: <span style={{ textTransform:"uppercase" }}>{task.category}</span>
        </p>
      </Card.Body>
      <Card.Footer className="d-flex gap-3 pt-1 pb-1">
          <p className={styles.TaskOwner}><i className="fa-solid fa-at fa-sm"></i>{task.owner}</p>
          {!!task.shared_to.length && 
            <p className={styles.Shared}>
              <i className="fa-solid fa-link fa-sm"></i>
              <span className={styles.SharedWord}>Shared</span>
            </p>
          }
          <p className={styles.DateTime}>
            created <span>{moment(task.datetime_created, "DD MMM YYYY | HH:mm").fromNow()}</span>
          </p>
      </Card.Footer>
    </Card>
  )
}

export default SearchCard;