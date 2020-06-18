import postSaga from './postSaga';
import formSaga from './saga';
import dashboardSaga from './dashboardSaga';
import blogSaga from './blogSaga';
import { all,call } from 'redux-saga/effects';

 export default function* rootSaga(getState) {
      yield all([call(postSaga),call(dashboardSaga), call(formSaga), call(blogSaga)])
  
  }