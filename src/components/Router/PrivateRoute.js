import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
const PrivateRoute = ({component: Component,...rest}) => {
  return (
    <Route {...rest} render={props =>
      !rest.loggedIn
        ?
     (<Redirect to="/" />):(<Component {...props} />)} />
  );
};

 const mapStateToProps=(state)=>{
    return{ 
    loggedIn:state.SignIn.loggedIn
   }
  }
  export default connect(mapStateToProps,null)(PrivateRoute);

 