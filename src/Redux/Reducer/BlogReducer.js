import * as actions from '../Action';
import moment from 'moment';
// import cookies from 'js-cookie';
const initialState={
       title:'',
       content:'',
       created:'',
       data:'',
       status:'',
};
 const Blog_Creation=(state=initialState,action)=>{
    const newState = {...state};
    switch(action.type){
      
     case actions.BLOG_CREATION:
         return{
           title:action.payload.data.title,
           content:action.payload.data.content,
           created:moment(action.payload.created).format('YYYY-MM-DD hh:mm:ss a'),
           data: action.payload.data,
           status: action.payload.status
          }
        default: return newState;
    }
    }
export default Blog_Creation;