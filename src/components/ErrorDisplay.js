import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from '../styles/ErrorDisplay.module.css';

function ErrorDisplay({error}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert className={styles.ErrorDisplay} variant="danger" onClose={() => setShow(false)} dismissible>
        <p className="m-0">
          Error will be displayed here.
          {error?.data?.detail}
        </p>
      </Alert>
    );
  }
};

export default ErrorDisplay;