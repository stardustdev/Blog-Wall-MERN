import { useState, useEffect } from 'react';

function useKeyPress() {
  const [event, setEvent] = useState(null);

  function handler(event) {
    setEvent(event);
  }

  useEffect(() => {
    window.addEventListener('keypress', handler);

    return () => {
      window.removeEventListener('keypress', handler);
    };
  }, []);

  return event;
}

export default useKeyPress;
