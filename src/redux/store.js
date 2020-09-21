// import logger from 'redux-logger'
import { createBrowserHistory as createHistory } from 'history';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const middlewares = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['Toast'],
};

const rootReducer = combineReducers({
  ...reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, history, persistor };
