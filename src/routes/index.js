import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';

import SideMenu from 'containers/SideMenu';
import Tags from 'containers/Tags';
import Activities from 'pages/Activities';
import Favorites from 'pages/Favorites';
import Home from 'pages/Home';
import Popular from 'pages/Popular';
import authActions from 'redux/auth/actions';

import style from './style.module.scss';

const Routes = ({ logout }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.Auth.user !== null);

  const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  );

  return (
    <div className={style.container}>
      <SideMenu
        history={history}
        loggedIn={loggedIn}
        onLogout={() => dispatch(authActions.signoutRequest())}
      />

      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/popular" exact component={Popular} />
        <PrivateRoute path="/favorites" exact isLoggedIn={loggedIn} component={Favorites} />
        <PrivateRoute path="/activity" exact isLoggedIn={loggedIn} component={Activities} />
        <Route path="*" exact render={() => <Redirect to="/home" />} />
      </Switch>
      <Tags />
    </div>
  );
};
export default Routes;
