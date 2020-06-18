import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import { Layout, Button,Row, Col,Icon,Menu, Avatar,Popover} from 'antd';
import './dashboard.css'
import profile from './profile.png';
import {store} from '../../Redux/store';
import * as actions from '../../Redux/Action';
import Cookies from 'js-cookie';
const user = Cookies.get('user-email')

const { Header,  Content } = Layout;

class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:user
            }
            };
          
    SignOut=(e)=>{
        store.dispatch({type:actions.Sign_Out})
      }
      
    render(){
    const popoverContent = <Button style={{backgroundColor:'#007bec',color:'#fff'}} onClick={this.SignOut}>Sign Out</Button>;
    
        return(
            <Fragment>
                <Layout>
                    <Header className='header'>
                        <Row type='flex' align="bottom" justify="space-around">
                            <Col xs ={{span:2}}>
                                    <Icon type="align-left" className="blogIcon"/>
                            </Col>
                            <Col xs={{span:8, }}>
                                <Row type="flex" justify="center">
                                        <Menu theme="light" mode="horizontal" onSelect={this.selectedMenu}
                                            defaultSelectedKeys={['1']}
                                            style={{ backgroundColor:'#007bec',color:'#fff' }} >
                                            <Menu.Item key="1">Posts</Menu.Item>
                                            <Menu.Item key="2">Blog</Menu.Item>
                                            <Menu.Item key="3">Profile</Menu.Item>
                                        </Menu>
                                </Row>
                            </Col>
                            <Col >
                                <span>{this.state.email}</span>
                                <Popover content={popoverContent}  placement="leftBottom">
                                <Avatar  src={profile} size='large' style={{marginLeft:'4px'}}/>
                                </Popover>
                            </Col>
                        </Row>
                    </Header>
             </Layout>
        </Fragment>

        );
    }
}
const mapStateToProps=(state)=>{
    return{
        email:state.FetchPost.email
   }
  }
  export default connect(mapStateToProps,null)(TopBar);
