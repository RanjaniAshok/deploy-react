
import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../Action';
import {message} from 'antd';
import axios from 'axios';
import { store } from '../Store';
import {getCookie,setCookie} from '../../components/helper';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const backend ='https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/users'
const header = {'Content-Type': 'application/json'}
function* addUser(data)
 {
  const auth={
    method:'post',
    url:`${backend}/register`,
    data:data.payload,
  }
  try {
  const response= yield call(()=>axios(auth,header));
  store.dispatch({type:actions.SIGN_IN, payload:{ email:data.payload.email, password:data.payload.password}})
  yield put({ type: actions.AddUser, payload:response}); 
  } 
  catch (error) {
    message.warning('Ooops!! Email-Id is already registered');
  }
}
function* checkUser(data)
 {
  const auth={
    method:'post',
    url:`${backend}/login`,
    data:{
      'login':data.payload.email,
       'password':data.payload.password
      }, 
}
  try {
 let response= yield call(()=>axios(auth,header));
 let token=response.data['user-token'];
 let email=response.data.email;
 setCookie('user-token',token,2)
 setCookie('userEmail',email,2)
 yield put({ type: actions.CheckUser, payload:response});
 message.success('You have been logged In');
  } 
  catch (error) {
     message.warning('Email or Password is incorrect');
  }
}

function* removeUser(data){
  const auth={
      method:'get',
      url:`${backend}/logout`,
      headers: { 'Content-Type': 'application/json',
      'user-token': getCookie('user-token'),
    }
     }
    try {
    const response= yield call(()=>axios(auth));
    document.cookie = "user-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    yield put({ type: actions.REMOVE_USER});

     } 
     catch(error){
 }
   }
 export default function* formSaga() {
    yield all([ takeLatest(actions.SIGN_IN,checkUser),
      takeLatest(actions.SIGN_UP,addUser),
      takeLatest(actions.Sign_Out,removeUser)
    ])
  }   
 
