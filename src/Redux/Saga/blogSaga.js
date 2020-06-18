import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../Action';
import axios from 'axios';
import {getCookie,setCookie} from '../../components/helper';
import {store} from '../Store';
import moment from 'moment';
const backend ='https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';
const fileBackend='https:backendlessappcontent.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53';
  function getDatas(){
  const getData={
    method:'get',
  url:`${backend}/data/Posts?where=publish in ('true')`,
   // url:'https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53[`/data/Posts?pageSize=5`](/data/Posts?pageSize=5)',
  }
  return getData;
  }
//*************************************************************************************************************************

function* fetchData(data){
  // let clause=encodeURIComponent('[`/data/Posts?pageSize=5`](/data/Posts?pageSize=5)')
  
    const fetch = yield call(()=>axios(getDatas()));
    yield put({type: actions.FETCH_DATA_SUCCESS, payload:fetch }) 
    let objectId=fetch.data[0].objectId;   
    const getPost={
        method:'get',
        url:`${backend}/data/Posts/${objectId}`,
      }
    const defaultPost = yield call(()=>axios(getPost));
    yield put({type: actions.GET_DEFAULTPOST_SUCCESS, payload:defaultPost.data})
     const getImage={
        method:'get',
        url:`${fileBackend}/files/Blog/${defaultPost.data.imageId}`,
      }
    const image = yield call(()=>axios(getImage))
    yield put({type: actions.GET_DEFAULTIMAGE_SUCCESS, payload:image.config.url})
    yield put({type: actions.GET_CLAPS,payload:objectId})   
}
//*************************************************************************************************************************
function* createComment(data){
 const createComment={
    method:'post',
    url:`${backend}/data/Comments`,
    data: { 'author':getCookie('userEmail'), 'content':data.payload.value,'avatar':'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',dateTime:moment().fromNow()},
    headers: { 'Content-Type': 'application/json'}
 }
 try{
const response = yield call(()=>axios(createComment));
yield put({type:actions.CREATE_COMMENTS_SUCCESS})
 const setRelation={
    method:'put',
    url:`${backend}/data/Posts/${data.payload.relationsId}/comments`,
    data:[response.data.objectId],
    headers: {'user-token':getCookie('user-token'), 'Content-Type': 'application/json'}
 }
yield call(()=>axios(setRelation));
yield put({type:actions.GET_POST,payload:data.payload.relationsId})
yield put({type:actions.FETCH_COMMENTS_SUCCESS})
}
catch(error){
    store.dispatch({type:actions.NO_COMMENTS})
}
}
//*************************************************************************************************************************
function* deleteComment(data){
 const deleteRelation={
    method:'delete',
    url:`${backend}/data/Posts/${data.payload.parentId}/comments`,
    data:[data.payload.commentId],
    headers: {'user-token':getCookie('user-token'), 'Content-Type': 'application/json'}
 }
 try{
yield call(()=>axios(deleteRelation));
yield put({type:actions.GET_POST,payload:data.payload.parentId})
}
catch(error){
    store.dispatch({type:actions.NO_COMMENTS})
}
}

//*************************************************************************************************************************
function* editComment(data){
  const editComment={
    method:'put',
    url:`${backend}/data/Comments/${data.payload.objectId}`,
    data: {  'content':data.payload.value},
    headers: { 'Content-Type': 'application/json',
    'user-token':getCookie('user-token')}
 }
 try{
const edit = yield call(()=>axios(editComment));

yield put({type:actions.GET_POST,payload:data.payload.relationsId})
yield put({type:actions.EDIT_COMMENTS_SUCCESS})
}
catch(error){
    store.dispatch({type:actions.NO_COMMENTS})
}
}
//*************************************************************************************************************************
function* setClaps(data){

  const claps={
    method:'post',
    url:`${backend}/data/Claps`,
    data: { claps:'true' ,user:`${data.payload.user}`},
    headers: { 'Content-Type': 'application/json'}
 }
 try{
 const response = yield call(()=>axios(claps));
 console.log(response)
store.dispatch({type:actions.SET_CLAPS_SUCCESS,payload:response})
 const setRelation={
    method:'put',
    url:`${backend}/data/Posts/${data.payload.relationsId}/claps`,
    data:[response.data.objectId],
    headers: {'user-token':getCookie('user-token'), 'Content-Type': 'application/json'}
 }
yield call(()=>axios(setRelation));
yield put({type: actions.GET_CLAPS,payload:`${data.payload.relationsId}`})   
yield put({type:actions.GET_POST,payload:data.payload.relationsId})
}
catch(error){

}
}
//*************************************************************************************************************************

function* getClaps(data){
  let clause= encodeURIComponent(`[claps].objectId='${data.payload}'`)
  let url=`${backend}/data/Claps/count?where=Posts${clause}`
const claps={
    method:'get',
     url:`${url}` 
   }
   const get = yield call(()=>axios(claps));
   yield put({type:actions.TOTAL_CLAPS,payload:get.data})
 }
//*************************************************************************************************************************
function* deleteClaps(data){
const deleteClaps={
    method:'delete',
     url:`${backend}/data/Claps/${data.payload.clapUserId}` 
   }
   const get = yield call(()=>axios(deleteClaps));
   store.dispatch({type:actions.DELETE_CLAPS_SUCCESS})
   yield put({type:actions.GET_CLAPS,payload:data.payload.relationsId})
 }

//*************************************************************************************************************************

export default function* blogSaga() {
    yield all([ 
      takeLatest(actions.CREATE_COMMENTS,createComment),
      takeLatest(actions.FETCH_DATA,fetchData),
       takeLatest(actions.DELETE_COMMENT,deleteComment),
       takeLatest(actions.EDIT_COMMENT,editComment),
       takeLatest(actions.SET_CLAPS,setClaps),
          takeLatest(actions.DELETE_CLAPS,deleteClaps),
      takeLatest(actions.GET_CLAPS,getClaps)
])
  }
