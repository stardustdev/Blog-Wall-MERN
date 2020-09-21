import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardHeader, CardBody, Form, FormGroup, Input } from 'reactstrap';

import useKeyPress from 'hooks/useKeyPress';
import authActions from 'redux/auth/actions';

import style from './style.module.scss';

const Login = ({ login, onClickRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);

  const keyEvent = useKeyPress();

  useEffect(() => {
    if (keyEvent && keyEvent.key === 'Enter') {
      handleSubmit();
    }
    //eslint-disable-next-line
  }, [keyEvent]);

  const isValidEmail = () => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  };

  const isValidForm = () => {
    if (!email || !password) return false;
    return isValidEmail();
  };

  const handleSubmit = () => {
    if (isValidForm()) {
      dispatch(authActions.signinRequest({ email, password }));
    }
  };

  return (
    <div className={style.container}>
      <CardHeader className={style.cardHeader}>
        <h3>Sign In</h3>
      </CardHeader>

      <CardBody className={style.cardBody}>
        <Form>
          <FormGroup className={style.formField}>
            <Input
              type="text"
              placeholder="Enter email address"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && !isValidEmail() && <span>Email address is invalid.</span>}
          </FormGroup>

          <FormGroup className={style.formField}>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Button
              outline
              color="primary"
              className={style.submit}
              disabled={!isValidForm() || loading}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </FormGroup>
        </Form>
      </CardBody>

      <div className={style.cardFooter}>
        Don't have an account? <span onClick={onClickRegister}>Sign Up</span>
      </div>
    </div>
  );
};

export default Login;
