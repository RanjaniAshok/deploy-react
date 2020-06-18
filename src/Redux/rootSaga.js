import postSaga from './DashboardRedux/Saga/postSaga';
import formSaga from './FormRedux/saga';
import dashboardSaga from './DashboardRedux/Saga/dashboardSaga';
import blogSaga from './BlogRedux/Saga/blogSaga';
import { all,call } from 'redux-saga/effects';

 export default function* rootSaga(getState) {
      yield all([call(postSaga),call(dashboardSaga), call(formSaga), call(blogSaga)])
  
  }