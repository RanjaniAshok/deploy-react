import * as actions from '../Action'
const initialState={
    email:'',
    status:'',
   loggedIn:false

}
 const SignIn=(state=initialState,action)=>{
     switch(action.type){
        case actions.CheckUser: 
            return{
                ...state,
                 email:action.payload.email,
                 loggedIn:true
         }
        case actions.REMOVE_USER: 
            return{
                ...state,
                 loggedIn:false
         }
        default: return state;
         }
         
 }
 export default SignIn;