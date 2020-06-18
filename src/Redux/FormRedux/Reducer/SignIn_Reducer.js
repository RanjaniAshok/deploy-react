import * as actions from '../../Action'
const initialState={
    email:'',
    status:'',
   loggedIn:false

}
 const SignIn=(state=initialState,action)=>{
     switch(action.type){
        case actions.CheckUser: 
        // console.log(action.payload.data.email)
            return{
                ...state,
                 email:action.payload.data.email,
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