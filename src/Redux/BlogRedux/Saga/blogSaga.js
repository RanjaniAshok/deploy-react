import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../../Action';
import commentSaga from './commentSaga';
import clapsSaga from './clapsSaga';
import { store } from '../../Store';
import {api} from '../../../api';
import axios from 'axios';

const fileBackend='https:backendlessappcontent.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';

function* fetchPublishedPosts(data)
{
    try{
    let offset=0;
    const fetch = yield call(()=>api.get(`/data/Posts?pageSize=${data.payload.pageSize}&offset=${offset}`));
    yield put({type: actions.SORT_POSTS, payload:fetch }) 
    yield put({type: actions.FETCH_PUBLISHED_POSTS_SUCCESS, payload:fetch.data}) 
    let post=store.getState().BlogData.listData[0];
    const defaultPost = yield call(()=>api.get(`/data/Posts/${post.objectId}`));
    yield put({type: actions.GET_DEFAULTPOST_SUCCESS, payload:defaultPost.data})
     const getImage={
        method:'get',
        url:`${fileBackend}/files/Blog/${defaultPost.data.imageId}`,
      }
    const image = yield call(()=>axios(getImage))
    yield put({type: actions.GET_DEFAULTIMAGE_SUCCESS, payload:image.config.url})
}
catch(error){
   yield put({type: actions.GET_DEFAULTPOST_FAILURE}) 
}
}
function* fetchAfterScrolling(data){
  try{
   const fetch = yield call(()=>api.get(`/data/Posts?pageSize=${data.payload.pageSize}&offset=${data.payload.offset}`));
   yield put({type: actions.SORT_POSTS, payload:fetch }) 
   yield put({type: actions.FETCH_AFTER_SCROLLING_SUCCESS, payload:fetch })
 }
 catch(error){
  yield put({type: actions.FETCH_AFTER_SCROLLING_FAILURE, payload:fetch })
 }
}

export default function* blogSaga() {
    yield all([ 
     takeLatest(actions.FETCH_PUBLISHED_POSTS,fetchPublishedPosts),
     takeLatest(actions.FETCH_AFTER_SCROLLING,fetchAfterScrolling),
     call(commentSaga),
     call(clapsSaga),
    ])
  }
