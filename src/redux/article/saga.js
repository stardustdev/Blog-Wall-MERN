import axios from 'axios';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import authActions from 'redux/auth/actions';
import toastActions from 'redux/toast/action';
import { getHeaders, getEndpoint } from 'utils/api';
import { getErrorMsg } from 'utils/errorHander';

import actions from './actions';

function* getAllArticlesHandler() {
  const params = {
    url: getEndpoint('article/'),
    method: 'GET',
    headers: getHeaders(),
  };

  try {
    const { data } = yield call(axios.request, params);
    const { user } = yield select((state) => state.Auth);

    yield put(
      actions.getAllArticlesSuccess(
        data.articles.map((article) => ({
          ...article,
          isLiked: user && article.liked_by.map(({ email }) => email).includes(user.email),
        })),
      ),
    );
  } catch (err) {
    yield put(actions.getAllArticlesFailed(err));
  }
}

function* getPopularArticlesHandler() {
  const params = {
    url: getEndpoint('article?type=popular'),
    method: 'GET',
    headers: getHeaders(),
  };

  try {
    const { data } = yield call(axios.request, params);
    const { user } = yield select((state) => state.Auth);

    yield put(
      actions.getPopularArticlesSuccess(
        data.articles.map((article) => ({
          ...article,
          isLiked: user && article.liked_by.map(({ email }) => email).includes(user.email),
        })),
      ),
    );
  } catch (err) {
    yield put(actions.getPopularArticlesError(err));
  }
}

function* addArticleHandler({ payload }) {
  const params = {
    url: getEndpoint('article/'),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  };

  try {
    const { data } = yield call(axios.request, params);
    yield put(actions.addArticleSuccess(data.article));
    yield put(
      toastActions.addToast({
        message: data.message,
        type: 'success',
      }),
    );
  } catch (err) {
    yield put(actions.addArticleFailed(err));
    yield put(
      toastActions.addToast({
        message: getErrorMsg(err),
        type: 'error',
      }),
    );
  }
}

function* deleteArticleHandler({ payload }) {
  const params = {
    url: getEndpoint(`article/${payload}`),
    method: 'DELETE',
    headers: getHeaders(),
  };

  try {
    const { data } = yield call(axios.request, params);
    yield put(actions.deleteArticleSuccess(payload));
    yield put(
      toastActions.addToast({
        message: data.message,
        type: 'success',
      }),
    );
  } catch (err) {
    yield put(actions.deleteArticleFailed(err));
    yield put(
      toastActions.addToast({
        message: getErrorMsg(err),
        type: 'error',
      }),
    );
  }
}

function* editArticleHandler({ id, payload }) {
  const params = {
    url: getEndpoint(`article/${id}`),
    method: 'PUT',
    headers: getHeaders(),
    data: payload,
  };

  try {
    const { data } = yield call(axios.request, params);
    yield put(actions.editArticleSuccess({ id, ...payload }));
    yield put(
      toastActions.addToast({
        message: data.message,
        type: 'success',
      }),
    );
  } catch (err) {
    yield put(actions.editArticleFailed(err));
    yield put(
      toastActions.addToast({
        message: getErrorMsg(err),
        type: 'error',
      }),
    );
  }
}

function* addCommentHandler({ id, payload }) {
  const params = {
    url: getEndpoint(`article/${id}/comment`),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  };

  try {
    const { data } = yield call(axios.request, params);
    yield put(
      actions.addCommentSuccess({
        articleId: id,
        comment: data.comment,
      }),
    );
    yield put(
      toastActions.addToast({
        message: data.message,
        type: 'success',
      }),
    );
  } catch (err) {
    yield put(actions.addCommentFailed(err));
    yield put(
      toastActions.addToast({
        message: getErrorMsg(err),
        type: 'error',
      }),
    );
  }
}

function* likeArticleHandler({ payload }) {
  const params = {
    url: getEndpoint(`article/${payload.id}/${payload.liked ? 'like' : 'unlike'}`),
    method: 'POST',
    headers: getHeaders(),
  };

  try {
    yield call(axios.request, params);
    yield put(actions.likeArticleSuccess(payload));
  } catch (err) {
    yield put(actions.likeArticleFailed(err));
    yield put(
      toastActions.addToast({
        message: getErrorMsg(err),
        type: 'error',
      }),
    );
  }
}

function* favoriteArticleHandler({ payload }) {
  const params = {
    url: getEndpoint(`article/${payload.id}/favorite/`),
    method: 'POST',
    headers: getHeaders(),
    data: {
      type: payload.isFavorited,
    },
  };

  try {
    yield call(axios.request, params);
    yield put(actions.favoriteArticleSuccess(payload));
    yield put(authActions.getFavoriteArticlesRequest());
  } catch (err) {
    yield put(actions.favoriteArticleFailed(err));
    yield put(
      toastActions.addToast({
        message: getErrorMsg(err),
        type: 'error',
      }),
    );
  }
}

export default function* articleSagas() {
  yield takeLatest(actions.GET_ALL_ARTICLES_REQUEST, getAllArticlesHandler);
  yield takeLatest(actions.GET_POPULAR_ARTICLES_REQUEST, getPopularArticlesHandler);
  yield takeLatest(actions.ADD_ARTICLE_REQUEST, addArticleHandler);
  yield takeLatest(actions.DELETE_ARTICLE_REQUEST, deleteArticleHandler);
  yield takeLatest(actions.EDIT_ARTICLE_REQUEST, editArticleHandler);
  yield takeLatest(actions.ADD_COMMENT_REQUEST, addCommentHandler);
  yield takeLatest(actions.LIKE_ARTICLE_REQUEST, likeArticleHandler);
  yield takeLatest(actions.FAVORITE_ARTICLE_REQUEST, favoriteArticleHandler);
}
