
import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../../Action';
import {message} from 'antd';
import history from '../../../history';
import { store } from '../../Store';
import {api} from '../../../api';
import {getCookie} from '../../../components/helper'
//*************************************************************************************************************************
function* createPost(data)
{
  const createPost={
     'title':data.payload.title,'content':data.payload.content, 
      'email':data.payload.email ,'imageId':data.payload.imageId
  }
try {
    yield call(()=>api.post('/data/Posts',createPost));
   message.success('post has been created');
  yield put({type: actions.CREATE_POST_SUCCESS })
  yield put({type:actions.CLOSE_DRAWER})
  yield put({type:actions.FETCH_POSTS,payload:store.getState().SignIn.email});
  } 
  catch (error) {
    message.warning('Invalid post');
  }
}
//*************************************************************************************************************************
function* fetchPosts(data){
   let userEmail=data.payload
    const fetch = yield call(()=>api.get(`/data/Posts?where=email in ('${userEmail}')`));
    yield put({type: actions.FETCH_POSTS_SUCCESS, payload:fetch })
     
}
//*************************************************************************************************************************

  function* clearPost(data){
    let objectId=data.payload.objectId;
    let imageId = data.payload.imageId
  const headers={'user-token':getCookie('user-token') } 
    try{
      const clear = yield call(()=>api.delete(`/data/Posts/${objectId}`,headers));
      yield put({type:actions.FETCH_POSTS,payload:store.getState().SignIn.email});
      yield call(()=>api.delete(`/files/Blog/${imageId}`));
      yield put({type: actions.CLEAR_POST_SUCCESS,payload:clear})
      history.push('/dashboard')
       }
    catch(error){}
    }
   //*************************************************************************************************************************

  export default function* dashboardSaga() {
    yield all([ takeLatest(actions.CREATE_POST,createPost),
    takeLatest(actions.FETCH_POSTS,fetchPosts),
    takeLatest(actions.CLEAR_POST,clearPost),

])
  };

// function* getImage(){
//   let imageId=store.getState().GetPost.imageId
//    const getImage={
//         method:'get',
//         url:`${fileBackend}/files/Blog/${imageId}`,
//       }
//     const image = yield call(()=>axios(getImage))
//     console.log(image)
//     yield put({type: actions.GET_IMAGE_SUCCESS, payload:image.config.url})

// }