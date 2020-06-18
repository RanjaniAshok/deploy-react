import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
const PublicRoute = ({component: Component,...rest}) => {
 return (
    <Route {...rest}
     render={props => (
      !rest.loggedIn
       ?  <Component {...props} />
               : <Redirect to="/dashboard" />
        )} />
);
  }
const mapStateToProps=(state)=>{
    return{
    loggedIn:state.SignIn.loggedIn
   }
  }
  export default connect(mapStateToProps,null)(PublicRoute);