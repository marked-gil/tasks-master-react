import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function FeedbackMessage({ message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant="success"
        onClose={() => setShow(false)} 
        dismissible
        style={{ marginTop:"-35px"}}
      >
        {message}
      </Alert>
    );
  }
}

export default FeedbackMessage;