
import {combineReducers} from 'redux';
import SignIn from './SignIn_Reducer';
import SignUp from './SignUp_Reducer';
import FetchData from './Data_Reducer';
import GetPost from './Post_Reducer';
import BlogData from './Blog_Reducer';
import Drawer from './DrawerReducer';

export const rootReducer = combineReducers({
    SignIn,
    SignUp,
    Drawer,
 FetchData,
 GetPost,
 BlogData
    });