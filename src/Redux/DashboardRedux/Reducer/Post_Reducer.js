
import * as actions from '../../Action';

const initialState={
       value:'',
       user:'',
       getImage:'',
       getPost:'',
       getComments:'',
       drawerButtonLoad:false,
       postContentLoading:false,
       postImageLoading:false,
       blogContentLoading:true,
       commentLoading:false,
       publish:false  
};
const GetPost=(state=initialState,action)=>{
      switch(action.type){
    case actions.CREATE_POST:
    return{
      ...state,
      drawerButtonLoad:true,
    }
        case actions.CREATE_POST_SUCCESS:
    return{
      ...state,
      drawerButtonLoad:false,
       }
    case actions.GET_POST:
    return{
      ...state,
        postContentLoading:true,  
        postImageLoading:true,
        commentLoading:true
    }
case actions.GET_POST_SUCCESS:
    return{
      ...state,
      postContentLoading:false,
       commentLoading:false,
      getPost:action.payload,
      getComments:action.payload.comments,
      getClaps:action.payload.claps,
      user:action.payload.email,
      value:'',
 }
 case actions.GET_POST_FAILURE:
    return{
      ...state,
      postContentLoading:false, 
 }
    case actions.GET_DEFAULTPOST_SUCCESS:
    return{
      ...state,
      getPost:action.payload,
      getComments:action.payload.comments,
      getClaps:action.payload.claps,
      postContentLoading:false,
    } 
     case actions.FETCH_COMMENTS_SUCCESS:
         return{
          ...state,
    getComments:action.payload
          }
   case actions.GET_CLAPS_SUCCESS:
         return{
          ...state,
    getClaps:action.payload
          }
     case actions.GET_DEFAULTIMAGE_SUCCESS:
    return{
      ...state,
       getImage:action.payload,
       blogContentLoading:false,
       }
    case actions.GET_DEFAULTPOST_FAILURE:
    return{
      ...state,
      blogContentLoading:false,
      } 
     case actions.GET_IMAGE:
    return{
      ...state,
       postImageLoading:true,
    }

    case actions.GET_IMAGE_SUCCESS:
    return{
      ...state,
      getImage:action.payload,
      postImageLoading:false,
    } 
    case actions.EDIT_POST:
    return{
      ...state,
      drawerButtonLoad:true,
      postContentLoading:true,
    }
    case actions.EDIT_POST_SUCCESS:
    return{
      ...state,
      getPost:action.payload.data,
      drawerButtonLoad:false,
      postContentLoading:false,
    }
    case actions.EDIT_IMAGE_SUCCESS:
    return{
      ...state,
        getImage:action.payload,
   }
   case actions.PUBLISH_POST:
    return{
      ...state,
       postContentLoading:true,
      }
  case actions.PUBLISH_POST_SUCCESS:
    return{
      ...state,
      publish:action.payload,
      postContentLoading:false,
      }
 case actions.UN_PUBLISH_POST:
    return{
      ...state,
         postContentLoading:true,
      }
  case actions.UN_PUBLISH_POST_SUCCESS:
    return{
      ...state,
      publish:action.payload,
         postContentLoading:false,

    }
     default: return state;
  }
}
export default GetPost;