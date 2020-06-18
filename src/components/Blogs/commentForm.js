
import React from 'react';
import {Input,Form,Button} from 'antd';
import {store} from '../../Redux/Store';
import * as actions from '../../Redux/Action';

const { TextArea } = Input;
class Editor extends React.Component {
  constructor(props){
  super(props);
  this.state = {
     value: props.value,
     editCommentId:'',
     relationsId:'',
    addText:'Add Comment',
    editText:'Edit Comment'};
}
componentDidUpdate(prevProps, prevState) {
  if (prevProps.value !== this.props.value) {
      this.setState({
         value:this.props.value,
      })  }
       }
//*******************************************************************************************************************************
handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  //*****************************************************************************************************************************

  addComment = () => {
   if (!this.state.value) {
      return;  }
   if(this.props.loggedIn){
   store.dispatch({type:actions.CREATE_COMMENTS,payload:{
    value:this.state.value,relationsId:this.props.relationsId } })
      } 
   this.setState({value:''})
   } 
//*****************************************************************************************************************************
editComment = () => {
  const {value}=this.state
  const { editCommentId, editRelationsId,loggedIn}=this.props
  if (!value) {
      return;  }
 if(loggedIn){
  store.dispatch({type:actions.EDIT_COMMENT,payload:{
  value:value,relationsId:editRelationsId, objectId:editCommentId }})
  }
this.setState({value:''})
}
//******************************************************************************************************************************
cancelEdit=()=>{
store.dispatch({type:actions.CANCEL_EDIT})
this.setState({value:''})
}
//******************************************************************************************************************************

render(){
  const {value, editText, addText}=this.state
  const {edit}=this.props
  return(
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={this.handleChange} value={value}/>
    </Form.Item>
    <Form.Item>
     {!edit?<Button loading={this.props.submitComment} onClick={this.addComment} type="primary">
       {addText}</Button>:
       <div>
       <Button  loading={this.props.submitComment} onClick={this.editComment} type="primary">
        {editText}
      </Button>
      <Button onClick={this.cancelEdit} type="secondary"> Cancel </Button>
      </div>
    }
    </Form.Item>
  </div>
);
}
}

   
export default Editor;