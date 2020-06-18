import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../../Action';
import {message} from 'antd';
import axios from 'axios';
import {api} from '../../../api';
import { store } from '../../Store';
const fileBackend='https:backendlessappcontent.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';

//*******************************************************************************************************************************

 function* getPost(data){
 let objectId=data.payload;
     try{
    const fetch = yield call(()=>api.get(`/data/Posts/${objectId}`));
     const getImage={
        method:'get',
        url:`${fileBackend}/files/Blog/${fetch.data.imageId}`,
      }
    const image = yield call(()=>axios(getImage))
    yield put({type: actions.GET_IMAGE_SUCCESS, payload:image.config.url})
    yield put({type: actions.GET_POST_SUCCESS, payload:fetch.data})
     }
 catch(error){
     yield put({type:actions.GET_POST_FAILURE})
      }
      }
//*******************************************************************************************************************************
function* editPost(data)
{
    const edit= { 'title':data.payload.title,
     'content':data.payload.content, 
     'email':data.payload.email ,
     'imageId':data.payload.imageId}

try {
  const response= yield call(()=>api.put(`/data/Posts/${data.payload.objectId}`,edit));
  yield put({type:actions.EDIT_POST_SUCCESS,payload:response});
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
//*******************************************************************************************************************************
function* publishPost(data){
    const publish={publish:'true'}
 try{
   const response= yield call(()=>api.put(`/data/Posts/${data.payload.objectId}`,publish));
   const userEmail=store.getState().SignIn.email
  yield put({type: actions.PUBLISH_POST_SUCCESS,payload:response.data.publish})
  yield put({type:actions.FETCH_POSTS,payload:userEmail});
  yield put({type:actions.GET_POST,payload:data.payload.objectId});
}
catch(error){
}
}
//*************************************************************************************************************************
function* UnPublishPost(data){
    const unPublish={ publish:'false'}
 try{
   const userEmail=store.getState().SignIn.email
   const response= yield call(()=>api.put(`/data/Posts/${data.payload.objectId}`,unPublish));
   yield put({type: actions.UN_PUBLISH_POST_SUCCESS,payload:response.data.publish})
   yield put({type:actions.FETCH_POSTS,payload:userEmail});
  yield put({type:actions.GET_POST,payload:data.payload.objectId});
 }
 catch(error){
 }}
//*************************************************************************************************************************
export default function* postSaga() {
    yield all([ takeLatest(actions.GET_POST,getPost),
      takeLatest(actions.EDIT_POST,editPost),
      takeLatest(actions.PUBLISH_POST,publishPost),
      takeLatest(actions.UN_PUBLISH_POST,UnPublishPost),
])
  }