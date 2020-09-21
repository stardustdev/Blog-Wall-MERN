import { all } from 'redux-saga/effects';

import articleSagas from './article/saga';
import authSagas from './auth/saga';

export default function* rootSaga() {
  yield all([authSagas(), articleSagas()]);
}
