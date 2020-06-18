
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';
import {rootReducer}from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'loggedIn',
  storage: storage,
  whitelist: ['SignIn'],
};
function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)
    const returnValue = next(action)
    console.log('state after dispatch', getState())
    return returnValue
  }
}

const pReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware()
const enhancers = composeWithDevTools(
  applyMiddleware(sagaMiddleware,logger)
)
export const store = createStore(pReducer, enhancers)
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga)