
import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from './Action';
import {message} from 'antd';
import axios from 'axios';
import cookies from 'js-cookie';
import { store } from './store';
import {moment } from 'moment';


 function* checkUserAsync(data)
 {
  const auth={
    method:'post',
    url:'https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/users/login',
    data:{
     'login':data.payload.email,
      'password':data.payload.password
     },
    headers: { 'Content-Type': 'application/json',}
   }
   try {
 let response= yield call(()=>axios(auth));

 cookies.set('user-token', response.data['user-token'])
 cookies.set('user-email', response.data.email)
 
 yield put({ type: actions.CheckUser, payload:response});
 message.success('You have been logged In');
  } 
  catch (error) {
     message.warning('Email or Password is incorrect');
  }
}

function* addUserAsync(data)
 {
    const auth={
    method:'post',
    url:'https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/users/register',
    data: data.payload,
    headers: { 'Content-Type': 'application/json',
 }
   }
   try {
  let response= yield call(()=>axios(auth));
    cookies.set('user-id', response.data.ownerId)
    cookies.set('user-email', response.data.email)
    yield put({ type: actions.AddUser, payload:response});  
  message.success('Your form has been submitted');
  } 
  catch (error) {
    message.warning('Ooops!! Email-Id is already registered');
  }
}

function* addBlog(data)
 {
    const auth={
    method:'post',
    url:'https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/data/Posts',
    data: {
    'title':data.payload.title,
    'content':data.payload.content,
    'email':data.payload.email,
    },
      headers: { 'Content-Type': 'application/json',
 }

  }
   const getData={
    method:'get',
    url:'https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/data/Posts',
    headers: { 'Content-Type': 'application/json',
  }
}


 try {
  let response= yield call(()=>axios(auth));
   message.success('post has been created')
   let fetch = yield call(()=>axios(getData))
   console.log('fetch',fetch)
  store.dispatch({type: actions.BLOG_CREATION, payload:fetch })
  } 
  catch (error) {
    message.warning('Invalid post');
  }
}
  export default function* rootSaga() {
    yield all([ takeLatest(actions.SIGN_IN,checkUserAsync),
      takeLatest(actions.SIGN_UP,addUserAsync),
      takeLatest(actions.BLOG,addBlog)

    ])
  }   
 
  