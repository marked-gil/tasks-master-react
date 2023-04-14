import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function SuccessFeedback({ message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    );
  }
}

export default SuccessFeedback;