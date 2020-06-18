import * as actions from '../Action';

const initialState={
       data:'',
       email:'',
       image:'',
       imageId:'',
       post:''
      
};
 const FetchPost=(state=initialState,action)=>{
    switch(action.type){
    case actions.FETCH_POST_SUCCESS:
         return{
          ...state,
           data: action.payload.data,
           // email:action.payload.data[0].email
          }
    case actions.SEARCH_POST_SUCCESS:
          return{
            ...state,
            data:action.payload,
          }    
    case actions.GET_POST_SUCCESS:
    return{
      ...state,
      post:action.payload.data,
      imageId:action.payload.data.imageId
    }  
    case actions.GET_IMAGE_SUCCESS:
    return{
      ...state,
      image:action.payload,
    } 
        default: return state;
    }
    }
export default FetchPost;