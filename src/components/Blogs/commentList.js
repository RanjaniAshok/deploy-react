import React  from 'react';
import {  Avatar,List,Skeleton,Icon,Popconfirm } from 'antd';
import {store} from '../../Redux/Store';
import * as actions from '../../Redux/Action';
import moment from 'moment';
class CommentList extends React.Component {
      deleteComment=(item,relationsId)=>{
      store.dispatch({type:actions.DELETE_COMMENT,payload:
      {
      commentId:item,
      parentId:relationsId
      }})
      }
    render(){
    	const {comments,relationsId,user,loggedIn}=this.props
      const postComments=comments.sort((a,b)=>{
        return a.created-b.created
      } )
    	return (
           <List
          dataSource={postComments}
          header={`${postComments.length} ${postComments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={item => 
           <List.Item  className="edit_hover_class"
                  actions={item.author===user && loggedIn ?
                   [
                   <span className="onHover"><Icon type="edit" theme="outlined" style={{color:'#007bec'}} 
                   onClick={()=>this.props.commentEditable(item,relationsId)} /></span>,
                   <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteComment(item.objectId,relationsId)}>
                   <span className="onHover"> <Icon type="delete" theme="outlined" style={{color:'red'}}/></span>
                   </Popconfirm>
                   ]:null}  >

                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                        avatar={<Avatar size="large" icon="user" />}
                       title={loggedIn?<div><p style={{color:'#007bec'}}>{item.author===user?'You':item.author}</p>
                        <p style={{color:'#BEBEBE'}} >{moment(new Date(item.created)).fromNow()}</p></div>:
                             <p style={{color:'#007bec'}}>{item.author}</p>
                           }
                        description={item.content}/>
                  </Skeleton>
                </List.Item>
              }
        />)
    }
}
export default CommentList;