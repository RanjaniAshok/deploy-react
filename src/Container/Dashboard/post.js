import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import {Layout,Row,Col,Typography,Button,Icon,Spin,Modal} from 'antd';
import {store} from '../../Redux/Store';
import './dashboard.scss';
import './post.scss';
import * as actions from '../../Redux/Action';
import {Link} from 'react-router-dom';
import ShowDrawer from '../../components/Drawer/drawer';
import TopBar from '../../components/TopBar/topBar';
import Publish from '../../components/Dashboard/publish'
import moment from 'moment';

const { Title,Text} = Typography;
const { Header,  Content } = Layout;
const { confirm } = Modal;
class Post extends React.Component {
constructor(props){
  super(props);
    this.state={
    post:'',
     imageTitle:'',
     drawerTitle:'Edit',
     deletePost:'',
    }
    }
     componentDidMount () {
      const {id} = this.props.match.params
      store.dispatch({type:actions.GET_POST,payload:id})
  
    }
  
    handleDelete=()=>{
       store.dispatch({type:actions.CLEAR_POST,payload:this.props.post})
     }
   showDrawer = () => {
      store.dispatch({type:actions.OPEN_DRAWER})
      };
     handleSubmit =(values)=> {
      store.dispatch({ type:actions.EDIT_POST, payload:{title:values.postTitle,
                  content:values.content,
                  imageId:`${this.props.imageId}.jpg`,
                  objectId:this.props.objectId
                  } })
         };
      showDeleteConfirm=()=> {
      this.setState({deletePost:this.props.post})
      confirm({
        title: 'Are you sure delete this task?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk:this.handleDelete,
    onCancel() {
    },
  });
}
          
render() {
const {post,image}=this.props
const {email,loggedIn}=this.props.user
const popoverContent = <Button style={{backgroundColor:'#007bec',color:'#fff'}} onClick={this.SignOut}>Sign Out</Button>;
  return(
  		<Fragment>
      <Layout>
  		<Header>
          <TopBar popoverContent={popoverContent} user={email} loggedIn={loggedIn}  />   
      </Header>
           <Content>
           <Row>
             <Row type='flex' align="middle" justify="space-around" className="postHeader">
                <Col xs ={{span:2}}>
                  <Link to = {`/dashboard`} style={{color:'#000',fontSize:'20px',fontWeight:'bold'}} > <Title level={4}>Back</Title></Link>
                </Col>
                <Col xs ={{span:5,offset:4}}>
                  <Publish publish={post.publish} dataId={post}/>
                   <Icon   className="delete-button"  type="delete" onClick={this.showDeleteConfirm} theme="outlined" style={{color:'red'}}/>
                  <Button key="2"  className="login-form-button" type="primary" onClick={this.showDrawer}>Edit</Button>
                </Col>
              </Row>
              <Spin spinning={this.props.postContentLoading}>
              <Row gutter={[0, 60]}>
                  <Col span={24}>
                     {<img src={image && image} alt=''style={{width:'100%',height:'415px'}}/>}
                  </Col>
              </Row>
              <Row>
                <Col span={20} offset={4}>
                 
                  <Title level={3}>{post && post.title}</Title>
                  <Text type="secondary">{ moment(post.created && post.created ).format('YYYY-MM-DD')}</Text>
                </Col>
              </Row>
              <Row type="flex" justify="center" className="postContent">
                 <Col span={16}>
                    <h3>{post && post.content}</h3>
                 </Col>
              </Row>
             </Spin>
            </Row>
         
            </Content>
             <ShowDrawer handleSubmit={this.handleSubmit} visible={this.props.visible} 
                    drawerTitle={this.state.drawerTitle} value={post} image={image} drawerButtonLoad={this.props.drawerButtonLoad}/>
       </Layout>
      </Fragment>
  		) }
}
   const mapStateToProps=(state)=>{
      return{
          drawerButtonLoad:state.GetPost.drawerButtonLoad,
           user:state.SignIn,
          post:state.GetPost.getPost,
          image:state.GetPost.getImage,
          postContentLoading:state.GetPost.postContentLoading,
          imageId:state.FetchData.imageId,
          objectId:state.GetPost.getPost.objectId,
          visible:state.Drawer.visible
         }
    }
export default connect(mapStateToProps,null)(Post);