import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../../Action';
import {message} from 'antd';
import {api} from '../../../api';
import {getCookie} from '../../../components/helper';
import {store} from '../../Store';

function* createComment(data){
  const author=store.getState().SignIn.email
    const createComment={
       'author':author, 'content':data.payload.value,
       'avatar':'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    }
    try{
   const response = yield call(()=>api.post(`/data/Comments`,createComment));
   yield put({type:actions.CREATE_COMMENTS_SUCCESS})
    const setRelation= [response.data.objectId];
    const headers= {'user-token':getCookie('user-token')}
    yield call(()=>api.put(`/data/Posts/${data.payload.relationsId}/comments`,setRelation,headers));
   yield put({type:actions.GET_COMMENTS,payload:data.payload.relationsId})
   }
   catch(error){
       message.warning('please SignIn!!!')
   }
   }
   //*************************************************************************************************************************
function* getComments(data){
     try{
   const comments = yield call(()=>api.get(`/data/Posts/${data.payload}/comments`))
    yield put({type:actions.FETCH_COMMENTS_SUCCESS,payload:comments.data})
   }
   catch(error){
       store.dispatch({type:actions.NO_COMMENTS})
   }
   }
//*************************************************************************************************************************
   function* deleteComment(data){
   
    try{
   yield call(()=>api.delete(`/data/Comments/${data.payload.commentId}`));
      yield put({type:actions.GET_COMMENTS,payload:data.payload.parentId})
   }
   catch(error){
       store.dispatch({type:actions.NO_COMMENTS})
   }
   }
   
   //*************************************************************************************************************************
   function* editComment(data){
     const editComment={ 'content':data.payload.value}
     const  headers={'user-token':getCookie('user-token')}
    try{
    yield call(()=>api.put(`/data/Comments/${data.payload.objectId}`,editComment,headers));
    yield put({type:actions.EDIT_COMMENTS_SUCCESS})
   yield put({type:actions.GET_COMMENTS,payload:data.payload.relationsId})
   }
   catch(error){
       message.warning('please SignIn!!!')
   }
   }
   export default function* commentSaga() {
    yield all([ 
        takeLatest(actions.CREATE_COMMENTS,createComment),
        takeLatest(actions.DELETE_COMMENT,deleteComment),
        takeLatest(actions.EDIT_COMMENT,editComment),
        takeLatest(actions.GET_COMMENTS,getComments)])
    }