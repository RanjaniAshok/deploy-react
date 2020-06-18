import * as actions from '../Action';
const initialState={
       submitComment:false,
       value:'',
       listData:'',
       fetchPostLoading:true,
       edit:false,
       editValue:'',
       editId:'',
       claps:'',
       clapUser:''
       }
       const BlogData=(state=initialState,action)=>{
       	 switch(action.type){
         case actions.FETCH_DATA_SUCCESS:
         return{
          ...state,
           listData: action.payload.data,
            fetchPostLoading:false,
          } 
          case actions.CREATE_COMMENTS_SUCCESS:
         return{
          ...state,
           value:'',
           submitComment:false
          }
        case actions.FETCH_COMMENTS_SUCCESS:
         return{
          ...state,
           submitComment:false
          }
        case actions.NO_COMMENTS:
         return{
          ...state,
           submitComment:false
          }
          case actions.EDIT:
          return{
          ...state,
          edit:true,
           editValue:action.payload.content,
           editId:action.payload.objectId
          }
          case actions.EDIT_COMMENTS_SUCCESS:
         return{
          ...state,
           submitComment:false,
           edit:false
          }
         case actions.TOTAL_CLAPS:
          return{
          ...state,
          claps:action.payload
          }
          case actions.SET_CLAPS_SUCCESS:
          return{
          ...state,
           clapUser:action.payload.data.user,
           clapUserId:action.payload.data.objectId
          }
           case actions.DELETE_CLAPS_SUCCESS:
          return{
          ...state,
           clapUser:'',
          }
        
           default: return state;
       }
     }
   export default BlogData;