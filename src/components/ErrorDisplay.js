import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorDisplay({error}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert 
        variant="danger" onClose={() => setShow(false)} 
        dismissible
      >
        <p className="m-0">{error}</p>
      </Alert>
    );
  }
}

export default ErrorDisplay;