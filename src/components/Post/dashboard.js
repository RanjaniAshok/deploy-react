import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import TopBar from '../TopBar/topBar';
import { Layout, Button,Row, Col,Icon,Menu, Avatar,Popover} from 'antd';
import './dashboard.css'
import profile from './profile.png';
import Post from './Posts.js'
import {store} from '../../Redux/store';
import * as actions from '../../Redux/Action';

import Cookies from 'js-cookie';

const { Header,  Content } = Layout;

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected:'Posts',
            email:Cookies.get('user-email'),
           }
            };
     selectedMenu=(Item)=>{
       this.setState({selected:Item.item.props.children}) 
    }
    SignOut=(e)=>{
        store.dispatch({type:actions.Sign_Out})
        Cookies.remove('user-token', {path:'',expires:1  });
        Cookies.remove('user-id',{path:'',})
       }
    render(){
    const popoverContent = <Button style={{backgroundColor:'#007bec',color:'#fff'}} onClick={this.SignOut}>Sign Out</Button>;
        return(
            <Fragment>
                <Layout>
                    <Header className='header'>
                        <TopBar popoverContent={popoverContent}/>
                    </Header>
                    <Content>
                          <Post selected={this.state.selected}></Post>
                     </Content>
                </Layout>

            </Fragment>

        );
    }
}
const mapStateToProps=(state)=>{
    return{
        status:state.Sign_In.status,
   }
  }
  export default connect(mapStateToProps,null)(Dashboard);
