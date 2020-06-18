import {takeLatest, all,call,put } from 'redux-saga/effects'
import * as  actions from '../../Action';
import {getCookie} from '../../../components/helper';
import {store} from '../../Store';
import {api} from '../../../api';

function* setClaps(data){
   let clapsData= { claps:'true' ,user:`${data.payload.user}`}
   let  headers={'user-token':getCookie('user-token')}
   try{
   const response = yield call(()=>api.post('/data/Claps',clapsData));
  let  relationData=[response.data.objectId]
  store.dispatch({type:actions.SET_CLAPS_SUCCESS,payload:response})
  yield call(()=>api.put(`/data/Posts/${data.payload.relationsId}/claps`,relationData,headers));
  yield put({type:actions.GET_CLAPS,payload:data.payload.relationsId})
}
  catch(error){ 
  }
  }
  //*************************************************************************************************************************
  function* getClaps(data){
    const claps= yield call(()=>api.get(`/data/Posts/${data.payload}/claps`))
    yield put({type:actions.GET_CLAPS_SUCCESS,payload:claps.data})
   }
//*************************************************************************************************************************

  function* deleteClaps(data){
     yield call(()=>api.delete(`/data/Claps/${data.payload.clapUserId}`));
     store.dispatch({type:actions.DELETE_CLAPS_SUCCESS})
     yield put({type:actions.GET_CLAPS,payload:data.payload.relationsId})
  
   }
  //*************************************************************************************************************************
  export default function* clapsSaga() {
    yield all([ takeLatest(actions.SET_CLAPS,setClaps),
        takeLatest(actions.DELETE_CLAPS,deleteClaps),
        takeLatest(actions.GET_CLAPS,getClaps)
       
  ])
    }