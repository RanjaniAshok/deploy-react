
import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../Action';
import {message} from 'antd';
import axios from 'axios';
import history from '../../history';
import {getCookie} from '../../components/helper'
import {store} from '../Store'
const backend ='https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';
  function getPosts(){
  let userEmail=getCookie('userEmail')
  const getData={
    method:'get',
    url:`${backend}/data/Posts?where=email in ('${userEmail}')`,
   
  }
  return getData;
  }
//*************************************************************************************************************************
function* createPost(data)
{
    const createPost={
    method:'post',
    url:`${backend}/data/Posts`,
    data: { 'title':data.payload.title, 'content':data.payload.content, 'email':data.payload.email ,'imageId':data.payload.imageId},
    headers: { 'Content-Type': 'application/json'}
 }
try {
   const response= yield call(()=>axios(createPost));
   message.success('post has been created');
     yield put({type: actions.CREATE_POST_SUCCESS })
   yield put({type:actions.CLOSE_DRAWER})
   const fetch=yield call(()=>axios(getPosts()));
   console.log(fetch)
   yield put({type: actions.FETCH_POST_SUCCESS, payload:fetch })
  } 
  catch (error) {
    message.warning('Invalid post');
  }
}
//*************************************************************************************************************************
function* fetchPost(data){
    const fetch = yield call(()=>axios(getPosts()));
    yield put({type: actions.FETCH_POST_SUCCESS, payload:fetch })
     
}
//*************************************************************************************************************************

  function* clearPost(data){
    let objectId=data.payload.objectId;
    let imageId = data.payload.imageId
       const deletePost={
        method:'delete',
        url:`${backend}/data/Posts/${objectId}`,
        headers:{ 'user-token':getCookie('user-token')}
      } 
       const deleteFile={
        method:'delete',
        url:`${backend}/files/Blog/${imageId}`,
      } 
    try{
      const clear = yield call(()=>axios(deletePost));
      const fetch=yield call(()=>axios(getPosts()));
      yield put({type: actions.FETCH_POST_SUCCESS, payload:fetch })
      yield call(()=>axios(deleteFile));
      yield put({type: actions.CLEAR_POST_SUCCESS,payload:clear})
      history.push('/dashboard')
       }
    catch(error){}
    }
   //*************************************************************************************************************************

  export default function* dashboardSaga() {
    yield all([ takeLatest(actions.CREATE_POST,createPost),
    takeLatest(actions.FETCH_POST,fetchPost),
    takeLatest(actions.CLEAR_POST,clearPost),

])
  };