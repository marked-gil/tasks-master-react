import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function FeedbackMessage({ message, danger }) {
  const [show, setShow] = useState(true);

  const variant = danger ? 'danger' : 'success'

  if (show) {
    return (
      <Alert
        variant={variant}
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