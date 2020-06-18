
import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../Action';
import {message} from 'antd';
import { store } from '../Store';
import {getCookie,setCookie} from '../../components/helper';
import {api} from '../../api';
function* addUser(data)
 {
  try {
  const response= yield call(()=>api.post('/users/register',data.payload));
  store.dispatch({type:actions.SIGN_IN, payload:{ email:data.payload.email, password:data.payload.password}})
  yield put({ type: actions.AddUser, payload:response}); 
  } 
  catch (error) {
    message.warning('Ooops!! Email-Id is already registered');
  }
}
//*************************************************************************************************************************

function* checkUser(data){
const params={
  'login':data.payload.email,
 'password':data.payload.password
}
  try {
 let response= yield call(()=>api.post('users/login',params));
 let token=response.data['user-token'];
 setCookie('user-token',token,2)
 yield put({ type: actions.CheckUser, payload:response});
 message.success('You have been logged In');
  } 
  catch (error) {
     message.warning('Email or Password is incorrect');
  }
}
//*************************************************************************************************************************

function* removeUser(data){
   const headers= { 'user-token': getCookie('user-token')}
    try {
    yield call(()=>api.get('/users/logout',headers));
    document.cookie = "user-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    yield put({ type: actions.REMOVE_USER});
     } 
     catch(error){
 }
   }

 //*************************************************************************************************************************

 export default function* formSaga() {
    yield all([ takeLatest(actions.SIGN_IN,checkUser),
      takeLatest(actions.SIGN_UP,addUser),
      takeLatest(actions.Sign_Out,removeUser)
    ])
  }   
 
