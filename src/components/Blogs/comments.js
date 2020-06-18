import React from 'react';
import {store} from '../../Redux/Store';
import * as actions from '../../Redux/Action';
import { Comment } from 'antd';
import CommentList from './commentList';
import Editor from './commentForm'
class CommentBox extends React.Component {
  constructor(props){
  super(props);
  this.state = {
      value:'',
     editCommentId:'',
     editRelationsId:'',
   };
}
commentEditable=(item,relationsId)=>{
this.setState({value:item.content,editCommentId:item.objectId,editRelationsId:relationsId})
    store.dispatch({type:actions.EDIT,payload:item})
 }
  render() {
    const { editCommentId, editRelationsId,value} = this.state;
    const{submitComment,edit}=this.props.commentsData;
    const {comments,relationsId,user,loggedIn}=this.props
      return (
        <div className="commentList"
         >{comments.length > 0 && <CommentList comments={comments} user={user}
         style={{backgroundColor:'#F5F5F5'}}
         relationsId={relationsId}
         commentEditable={this.commentEditable} 
         loggedIn={loggedIn}/>}
      {loggedIn? <Comment
          content={
            <Editor
               submitComment={submitComment}
               edit={edit} 
               editRelationsId={editRelationsId}
               editCommentId={ editCommentId}
               {...this.props}
               value={value}/> }
          />:null } 
      </div> );
}
}
export default CommentBox;
