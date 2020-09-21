import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Container } from 'reactstrap';

import style from './app.module.scss';
import Routes from './routes';

function App() {
  const { addToast } = useToasts();
  const { toast } = useSelector((state) => state.Toast);
  useEffect(() => {
    if (toast) {
      addToast(toast.message, { appearance: toast.type });
    }
  }, [addToast, toast]);

  return (
    <div className={style.container}>
      <BrowserRouter>
        <Container>
          <Routes />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
