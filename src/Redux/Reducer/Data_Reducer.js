import * as actions from '../Action';

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
    case actions.FETCH_POST_SUCCESS:
         return{
          ...state,
           data: action.payload.data,
           tableDataLoading:false
           }
        case actions.SET_IMAGE_TITLE:
         return{
          ...state,
           imageId: action.payload,
          }
    case actions.SEARCH_POST:
          return{
            ...state,
            }   
    case actions.CLEAR_POST_SUCCESS:
          return{
            ...state,
      getPost:action.payload.data,
          }
        default: return state;
    }
    }
export default FetchData;