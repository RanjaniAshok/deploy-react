
import * as actions from '../Action';

const initialState={
       value:'',
       getImage:'',
       getPost:'',
       getComments:'',
       drawerButtonLoad:false,
       postContentLoading:true,
       blogContentLoading:true,
       publish:false
 
      
};
const GetPost=(state=initialState,action)=>{
      switch(action.type){
        case actions.CREATE_POST_SUCCESS:
    return{
      ...state,
      drawerButtonLoad:false,

    }
case actions.GET_POST_SUCCESS:
    return{
      ...state,
      getPost:action.payload,
      getComments:action.payload.comments,
      value:'',
      publish:false
 }  
    case actions.GET_DEFAULTPOST_SUCCESS:
    return{
      ...state,
      getPost:action.payload,
      getComments:action.payload.comments,
    } 
     case actions.GET_DEFAULTIMAGE_SUCCESS:
    return{
      ...state,
       getImage:action.payload,
       blogContentLoading:false
    } 
    case actions.GET_IMAGE_SUCCESS:
    return{
      ...state,
      getImage:action.payload,
      postContentLoading:false,
      blogContentLoading:false
    } 
    case actions.EDIT_POST_SUCCESS:
    return{
      ...state,
      getPost:action.payload.data,
      drawerButtonLoad:false,

    }
    case actions.EDIT_IMAGE_SUCCESS:
    return{
      ...state,
        getImage:action.payload,
   
    }
    case actions.PUBLISH_POST_SUCCESS:
    return{
      ...state,
      publish:true
   
    }
     default: return state;
  }
}
export default GetPost;