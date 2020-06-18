import * as actions from '../Action';
const initialState={
       submitComment:false,
       email:'',
       likeTheme:'outlined',
       commentValue:'',
       listData:'',
       sortData:'',
       fetchPostLoading:false,
       hasMore:true,
       edit:false,
       editValue:'',
       editId:'',
       claps:'',
       clapUser:'',
       pageSize:7,
       offset:0
       }
       const BlogData=(state=initialState,action)=>{
       	 switch(action.type){
          case actions.SORT_POSTS:
            return{
              ...state,
          sortData:action.payload.data.sort((a,b)=>b.updated-a.updated)
            }
         case actions.FETCH_PUBLISHED_POSTS_SUCCESS:
         return{
          ...state,
          listData:state.sortData.filter(item=>item.publish==='true'),
           offset:action.payload.length,
           } 
          case actions.INFINITE_LOAD:
          return{
             ...state,
            fetchPostLoading:true,
            hasMore:true
          }
          case actions.FETCH_AFTER_SCROLLING_SUCCESS:
         return{
          ...state,
         listData:state.listData.concat(state.sortData.filter(item=>item.publish==='true')),
         offset:state.pageSize+state.offset,
         fetchPostLoading:false,
          }
          case actions.CREATE_COMMENTS:
         return{
          ...state,
           submitComment:true
          }
          case actions.CREATE_COMMENTS_SUCCESS:
         return{
          ...state,
           submitComment:false
          } 
          case actions.GET_POST:
          return{
            ...state,
              edit:false,
              commentValue:''   
          }
          case actions.EDIT:
          return{
          ...state,
          edit:true,
          }
          case actions.CANCEL_EDIT:
          return{
          ...state,
          edit:false,
          }
          case actions.EDIT_COMMENT:
         return{
          ...state,
           submitComment:true,
          }
          case actions.EDIT_COMMENTS_SUCCESS:
         return{
          ...state,
           submitComment:false,
           edit:false
          }
          case actions.SET_CLAPS_SUCCESS:
          return{
          ...state,
           clapUserId:action.payload.data.objectId,
           likeTheme:'filled'
          }
          case actions.DELETE_CLAPS_SUCCESS:
          return{
          ...state,
         
           likeTheme:'outlined'
          }
        
           default: return state;
       }
     }
   export default BlogData;