
import {combineReducers} from 'redux';
import SignIn from './FormRedux/Reducer/SignIn_Reducer';
import SignUp from './FormRedux/Reducer/SignUp_Reducer';
import FetchData from './DashboardRedux/Reducer/Data_Reducer';
import GetPost from './DashboardRedux/Reducer/Post_Reducer';
import BlogData from './BlogRedux/Blog_Reducer';
import Drawer from './DashboardRedux/Reducer/DrawerReducer';

export const rootReducer = combineReducers({
    SignIn,
    SignUp,
    Drawer,
 FetchData,
 GetPost,
 BlogData
    });