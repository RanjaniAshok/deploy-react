import React from 'react';
import { Layout,Row, Col,Menu, Avatar,Popover,Button} from 'antd';
import {Link} from 'react-router-dom';
import './topBar.css';
import profile from './profile.png';
import blog from './blog.png';
const { Header } = Layout;
class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            selected:''
            }
            };    
    render(){
    const {user,loggedIn}=this.props
        return(
                    <Header className='header'>
                       {loggedIn? <Row type='flex' align="bottom" justify="space-around">
                            <Col xs ={{span:2}}>
                            <img src={blog} alt="cannot load"/>
                            </Col>
                            <Col xs={{span:12 }}>
                                <Row type="flex" justify="center">
                                        <Menu theme="light" mode="horizontal"
                                            style={{ backgroundColor:'#007bec',color:'#fff' }} >
                                         <Menu.Item key="1"><Link to="/dashboard" style={{color:"#fff"}}>Dashboard</Link></Menu.Item>
                                         <Menu.Item key="2"> <Link to="/dashboard/blogs" style={{color:"#fff"}}>Blogs</Link></Menu.Item>
                                         <Menu.Item key="3">Post</Menu.Item>
                                        </Menu>
                                </Row>
                            </Col>
                            <Col >
                                <span>{user}</span>
                                <Popover content={this.props.popoverContent}  placement="leftBottom">
                                <Avatar  src={profile} size='large' style={{marginLeft:'4px'}}/>
                                </Popover>
                            </Col>
                        </Row>:
                        <div className="topBar">
                                <Avatar size="large" icon="user"/>
                               <Button className="SignIn_Button"><Link to ="/SignIn">Sign In</Link> </Button>
                             </div>}
                    </Header>

        );
    }
}
   export default (TopBar);
