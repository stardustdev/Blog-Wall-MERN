import axios from 'axios';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import toastActions from 'redux/toast/action';
import { getHeaders, getEndpoint } from 'utils/api';
import { saveToken, clearToken, saveUser, clearUser } from 'utils/localStorage';

import actions from './actions';

function* signinRequestHandler({ payload }) {
  const params = {
    url: getEndpoint('auth/login'),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  };

  try {
    const { data } = yield call(axios.request, params);
    const { token, user } = data;

    saveToken(token);
    saveUser(user);
    yield put(actions.signinSuccess(user));
  } catch (err) {
    yield put(actions.signinFailed(err));
    yield put(
      toastActions.addToast({
        message: err.response.data.message,
        type: 'error',
      }),
    );
  }
}

function* signupRequestHandler({ payload }) {
  const params = {
    url: getEndpoint('auth/register'),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  };

  try {
    const { data } = yield call(axios.request, params);
    const { token, user } = data;

    saveToken(token);
    saveUser(user);
    yield put(actions.signupSuccess(user));
  } catch (err) {
    yield put(actions.signupFailed(err));
    yield put(
      toastActions.addToast({
        message: err.response.data.message,
        type: 'error',
      }),
    );
  }
}

function* signoutRequestHandler() {
  const params = {
    url: getEndpoint('auth/logout'),
    method: 'GET',
    headers: getHeaders(),
  };

  try {
    yield call(axios.request, params);
    clearToken();
    clearUser();

    yield put(actions.signoutSuccess());
  } catch (err) {
    yield put(actions.signoutFailed(err));
  }
}

function* getUserArticlesHandler() {
  const params = {
    url: getEndpoint('user/articles/'),
    method: 'GET',
    headers: getHeaders(),
  };

  try {
    const { data } = yield call(axios.request, params);

    yield put(actions.getUserArticlesSuccess(data.articles));
  } catch (err) {
    yield put(actions.getUserArticlesFailed(err));
  }
}

function* getFavoriteArticlesHandler() {
  const { user } = yield select((state) => state.Auth);
  if (!user) {
    yield put(actions.getFavoriteArticlesFailed(''));
    return;
  }

  const params = {
    url: getEndpoint('user/favorites/'),
    method: 'GET',
    headers: getHeaders(),
  };

  try {
    const { data } = yield call(axios.request, params);

    yield put(
      actions.getFavoriteArticlesSuccess(
        data.favorites.map((article) => ({
          ...article,
          isLiked: user && article.liked_by.map(({ email }) => email).includes(user.email),
        })),
      ),
    );
  } catch (err) {
    yield put(actions.getFavoriteArticlesFailed(err));
  }
}

export default function* authSagas() {
  yield takeLatest(actions.SIGNIN_REQUEST, signinRequestHandler);
  yield takeLatest(actions.SIGNUP_REQUEST, signupRequestHandler);
  yield takeLatest(actions.SIGNOUT_REQUEST, signoutRequestHandler);
  yield takeLatest(actions.GET_USER_ARTICLES_REQUEST, getUserArticlesHandler);
  yield takeLatest(actions.GET_FAVORITE_ARTICLES_REQUEST, getFavoriteArticlesHandler);
}
