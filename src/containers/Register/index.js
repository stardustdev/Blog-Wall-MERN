import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardHeader, CardBody, Form, FormGroup, Input } from 'reactstrap';

import Button from 'components/Button';
import useKeyPress from 'hooks/useKeyPress';
import authActions from 'redux/auth/actions';

import style from './style.module.scss';

const Register = ({ onClickLogin }) => {
  const [form, setForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPass: '',
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);

  const keyEvent = useKeyPress();

  useEffect(() => {
    if (keyEvent && keyEvent.key === 'Enter') {
      handleSubmit();
    }
    //eslint-disable-next-line
  }, [keyEvent]);

  const { firstname, lastname, email, password, confirmPass } = form;

  const isValidEmail = () => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  };

  const isValidPassword = () => {
    return password.length > 5 && password.length < 128;
  };

  const isValidForm = () => {
    if (!email || !password || !firstname || !lastname) return false;
    if (password !== confirmPass) return false;

    return isValidEmail() && isValidPassword();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (isValidForm()) {
      dispatch(authActions.signupRequest({ firstname, lastname, email, password }));
    }
  };

  return (
    <div className={style.container}>
      <CardHeader className={style.cardHeader}>
        <h3>Sign Up</h3>
      </CardHeader>

      <CardBody className={style.cardBody}>
        <Form>
          <FormGroup className={style.formField}>
            <Input
              type="text"
              placeholder="Enter first name"
              name="firstname"
              value={firstname}
              disabled={loading}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className={style.formField}>
            <Input
              type="text"
              placeholder="Enter last name"
              name="lastname"
              value={lastname}
              disabled={loading}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className={style.formField}>
            <Input
              type="text"
              placeholder="Enter email address"
              name="email"
              value={email}
              disabled={loading}
              onChange={handleChange}
            />
            {email && !isValidEmail() && <span>Email address is invalid.</span>}
          </FormGroup>

          <FormGroup className={style.formField}>
            <Input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              disabled={loading}
              onChange={handleChange}
            />
            {password && !isValidPassword() && (
              <span>Password length should be more than 5 and less than 128.</span>
            )}
          </FormGroup>

          <FormGroup className={style.formField}>
            <Input
              type="password"
              placeholder="Re-type password"
              name="confirmPass"
              value={confirmPass}
              disabled={loading}
              onChange={handleChange}
            />
            {confirmPass && password !== confirmPass && <span>Password does not match.</span>}
          </FormGroup>

          <FormGroup>
            <Button
              outline
              color="primary"
              className={style.submit}
              disabled={!isValidForm() || loading}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </FormGroup>
        </Form>
      </CardBody>

      <div className={style.cardFooter}>
        Already have an account? <span onClick={onClickLogin}>Sign In</span>
      </div>
    </div>
  );
};

export default Register;
