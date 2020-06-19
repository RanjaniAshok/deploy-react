import React from 'react';
import './App.css';
import SignUp from './Container/Form/SignUp';
import SignIn from './Container/Form/SignIn';
import Dashboard from './Container/Dashboard/dashboard';
import Post from './Container/Dashboard/post';
import Blogs from './Container/Blogs/blogs';
import PrivateRoute from './components/Router/PrivateRoute';
import PublicRoute from './components/Router/PublicRoute';
import history from "./history.js";
import {HashRouter as Router} from 'react-router-dom';
import {
  Route,
  Switch,
} from "react-router-dom";
const App = () => (
 <Router history={history} basename="build" >
  <Switch>
  <Route exact path="/" component={Blogs}/>
  <PublicRoute  exact path="/SignUp" component={SignUp}/>
  <PublicRoute  exact path="/SignIn" component={SignIn} />
  <PrivateRoute  exact path="/dashboard" component={Dashboard}/>
  <PrivateRoute exact path="/post/:id" component={Post} />
   {<PrivateRoute exact path="/blogs" component={Blogs} />}
   </Switch>
   </Router>
);
export default App;


