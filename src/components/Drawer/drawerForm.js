
import React from 'react';
import {message} from 'antd';
import * as actions from '../../Redux/Action';
import {store} from '../../Redux/Store';
import './drawer.scss';
import CustomizedForm from './customizedForm'

class DrawerForm extends React.Component {
  constructor(props){
  super(props);
    this.state={
    fields: {
      postTitle: {
        value: props.value.title },
      content:{
        value:props.value.content },
      file:{
        value:props.image }
    },
      visible:false,
      imageTitle:'',
      loading:false,
  };
}
  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };
    beforeUpload=(file)=> {
      store.dispatch({type:actions.SET_IMAGE_TITLE,payload:file.uid})
     this.setState({imageTitle:file.uid})
       const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isLt2M;
    }
handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
      }
      if (info.file.status === 'done') {
        this.setState({
            loading: false
          });
      }
    } 
  render() {
   const { fields } = this.state;
   const {handleSubmit,onClose,buttonText,drawerButtonLoad}=this.props
    return (
      <div>
        <CustomizedForm {...fields} {...this.state}
        onChange={this.handleFormChange} 
        beforeUpload={this.beforeUpload}
        handleChange={this.handleChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
        buttonText={buttonText}
        drawerButtonLoad={drawerButtonLoad} />
      </div>
    );
  }
}
  export default DrawerForm;