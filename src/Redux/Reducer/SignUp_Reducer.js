import * as actions from '../Action';
const initialState={
        email:'',
        firstname:'',
        lastname:'',
        loggedIn:''
};
 const Sign_Up=(state=initialState,action)=>{
    switch(action.type){
     case actions.AddUser: return{
      ...state,
           firstname:action.payload.data.firstname,
           lastname:action.payload.data.lastname,
           email: action.payload.data.email,
           loggedIn:true
     }
        default: return state;
    }
    }
export default Sign_Up;