import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../Action';
import {message} from 'antd';
import axios from 'axios';
import cookies from 'js-cookie';
import {getCookie} from '../../components/helper'
import {store} from '../Store'
const backend ='https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';
const fileBackend='https:backendlessappcontent.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';
 function* getPost(data){
 let objectId=data.payload;
   const getPost={
        method:'get',
        url:`${backend}/data/Posts/${objectId}`,
      }
      
    try{
    const fetch = yield call(()=>axios(getPost));
    yield put({type: actions.GET_POST_SUCCESS, payload:fetch.data})
    const getImage={
        method:'get',
        url:`${fileBackend}/files/Blog/${fetch.data.imageId}`,
      }
    const image = yield call(()=>axios(getImage))
    yield put({type: actions.GET_IMAGE_SUCCESS, payload:image.config.url})
     yield put({type: actions.GET_CLAPS, payload:objectId})   

     }
 catch(error){
      message.warning('No such Posts available')
      }
      }
//*******************************************************************************************************************************
function* editPost(data)
{
    const edit={
    method:'put',
    url:`${backend}/data/Posts/${data.payload.objectId}`,
    data: { 'title':data.payload.title, 'content':data.payload.content, 'email':data.payload.email ,'imageId':data.payload.imageId},
    headers: { 'Content-Type': 'application/json'}
 }
try {
  const response= yield call(()=>axios(edit));
  yield put({type:actions.EDIT_POST_SUCCESS,payload:response})
  const getImage={
        method:'get',
        url:`${fileBackend}/files/Blog/${response.data.imageId}`,
      }
  const image = yield call(()=>axios(getImage))
  yield put({type: actions.EDIT_IMAGE_SUCCESS, payload:image.config.url})
  yield put({type:actions.CLOSE_DRAWER})
} 
  catch (error) {
    message.warning('Invalid post');
  }
}
function* publishPost(data){
    const publish={
    method:'put',
    url:`${backend}/data/Posts/${data.payload.objectId}`,
    data: {publish:'true'},
    headers: { 'Content-Type': 'application/json'}
 }
   const response= yield call(()=>axios(publish));
  yield put({type: actions.PUBLISH_POST_SUCCESS})
  yield put({type: actions.GET_POST, payload:data.payload.objectId})
 let userEmail=getCookie('userEmail')
  const getData={
    method:'get',
    url:`${backend}/data/Posts?where=email in ('${userEmail}')`, 
  }
  const fetch = yield call(()=>axios(getData));
   yield put({type: actions.FETCH_POST_SUCCESS, payload:fetch })


}
//*************************************************************************************************************************

export default function* postSaga() {
    yield all([ takeLatest(actions.GET_POST,getPost),
      takeLatest(actions.EDIT_POST,editPost),
      takeLatest(actions.PUBLISH_POST,publishPost)
])
  }