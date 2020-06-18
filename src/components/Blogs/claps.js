import React,{Fragment}  from 'react';
import {store} from '../../Redux/Store';
import * as actions from '../../Redux/Action';
import { Row,Col,Avatar,Icon,Modal,List,Button,Tooltip} from 'antd';
class Claps extends React.Component {
  constructor(props){
    super(props);

this.state = {
    value: '',
    theme:'outlined',
    visible:false,  
  };
}
componentDidMount() {
  store.dispatch({type: actions.GET_POST,payload:this.props.post })
    }
clapsCount=(e)=>{
  const {clappedUsers,user,post,loggedIn}=this.props
  if(loggedIn){
  if(clappedUsers.length>0){
      for(let i=0;i<clappedUsers.length;i++){
        if(clappedUsers[i].user===user){
           store.dispatch({type:actions.DELETE_CLAPS, payload:{
           clapUserId:clappedUsers[i].objectId,relationsId:post}})
        break;
      }
        else{
         store.dispatch({type:actions.SET_CLAPS, payload:{
         user:user, relationsId:post}})
        } }
    }
    else{
       store.dispatch({type:actions.SET_CLAPS, payload:{
         user:user, relationsId:post}})
     }
    }
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
render(){
    const {likeTheme}=this.props.blogData
    const {clappedUsers,user,loggedIn}=this.props
 console.log(this.props);
  	return (
  		<Fragment>
  		<Row type="flex">
  			<Col span={20}>
      {loggedIn?'If you found this article helpful,Like!!!':'See whoever liked the post'}
        {loggedIn ?<Icon type="like" theme={likeTheme}
               onClick={this.clapsCount}
              style={{ fontSize: '26px',color:"#F6B547" }}/>:null}
        {clappedUsers.length >0 && <Tooltip placement="topLeft" title="Click to view Likes">
          <Button type="primary"
          style={{ marginLeft:'5px'}}
           shape="circle" size="small" 
           onClick={this.showModal}>{clappedUsers.length}</Button>
          </Tooltip>}
    	</Col>
       {clappedUsers.length >0 &&  <Modal
          title="Claps"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='300px' >
  <List
    dataSource={clappedUsers}
    header={`${clappedUsers.length} ${clappedUsers.length > 1 ? 'claps' : 'clap'}`}
    itemLayout="horizontal"
    renderItem={item => 
     <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large" icon="user" />}
                title={loggedIn && item.user===user?
                  <div>
                  <p>You</p>
                  <p>{item.user}</p>
                  </div>:
                  item.user}
              />
          </List.Item>
        }/>
        </Modal>}
  		</Row>
    </Fragment>

  		)
  }
  }
export default Claps;

