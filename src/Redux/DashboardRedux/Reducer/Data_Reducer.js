import * as actions from '../../Action';

const initialState={
       data:[],
       tableDataLoading:true,
       searchedData:'',
       email:'',
       getImage:'',
       imageId:'',
       getPost:'',
       objectId:'',
      };
 const FetchData=(state=initialState,action)=>{
    switch(action.type){
      case actions.FETCH_POSTS:
         return{
          ...state,
        tableDataLoading:true,   
           }
    case actions.FETCH_POSTS_SUCCESS:
         return{
          ...state,
           data:action.payload.data,
           tableDataLoading:false,
           }
   case actions.SET_IMAGE_TITLE:
       return{
          ...state,
     imageId: action.payload,
          }
    case actions.SEARCH_POST:
          return{
            ...state,
     data: action.payload,  
            }  
     
    case actions.PUBLISH_POST:
      return{
            ...state,
     tableDataLoading:true,

          }
    case actions.PUBLISH_POST_SUCCESS:
      return{
            ...state,
     tableDataLoading:false,
          }
            case actions.UN_PUBLISH_POST:
      return{
            ...state,
     tableDataLoading:true,

          }
    case actions.UN_PUBLISH_POST_SUCCESS:
      return{
            ...state,
     tableDataLoading:false,

          }
    case actions.CLEAR_POST:
          return{
            ...state,
     tableDataLoading:true,
          } 
    case actions.CLEAR_POST_SUCCESS:
          return{
            ...state,
      getPost:action.payload.data,
       tableDataLoading:false,
          }
        default: return state;
    }
    }
export default FetchData;