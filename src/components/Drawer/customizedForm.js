
import React from 'react';
import { Button,Form,Input,Icon, Upload,Card,Typography} from 'antd';
import './drawer.scss'
const { Text} = Typography;
const { TextArea } = Input;

const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
    postTitle: Form.createFormField({
        ...props.postTitle,
        value: props.postTitle.value,
      }),
     content: Form.createFormField({
        ...props.content,
        value: props.content.value,
      }), 
     file: Form.createFormField({
        ...props.value,
        value: props.file.value,
      }),
   };
       },
  onValuesChange(_, values,props) {
  },
    
})(props => {
  const { getFieldDecorator } = props.form;
const  handleSubmit = e => {
        e.preventDefault();
      props.form.validateFields((err, values) => {
             if (!err) {
              props.handleSubmit(values);
               }
                });
    
         };

  return (
     <Form  className="login-form"  onSubmit={handleSubmit}>
                              <Form.Item label="Blog Title" colon={false}>
                                {getFieldDecorator('postTitle', {
                             
                              rules: [{ required: true, message: 'Please input your username!',min:6, }],
                                })(
                                  <Input
                                    placeholder="Title"
                                  />,
                                )}
                                </Form.Item>
                                
                                <Form.Item label="Cover Image" colon={false}>
                                    {getFieldDecorator('file', {
                                      rules: [{ required: true, message: 'Please upload an image!' }]
                                     })
                                    (<div>
                                      <Upload
                                          name="avatar"
                                          action={`https:backendlessappcontent.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/files/Blog/${props.imageTitle}.jpg`}
                                           beforeUpload={props.beforeUpload}
                                           handleChange={props.handleChange}
                                           listType="picture"
                                        >
                                        <Card  bordered={true} style={{ width: 300, height:150 }}>
                                          <div className="uploadCard">
                                           { props.file.value!==undefined?
                                        <img src={props.file.value} alt='' style={{width:'70px',height:'35px',marginLeft:'28px'}}/>
                                      : <Icon type="inbox" style={{fontSize:"60px", color:' #007bec' ,marginLeft:'30px'}}  />
                                           }
                                         <p className="ant-upload-text" style={{marginLeft:'15px'}}>Click to upload</p>
                                            <Text  type="secondary" >Image format: jpg or png</Text>
                                          </div>
                                        </Card>
                                      </Upload>
                                     
                                 </div>
                                     )}
                                  </Form.Item>
                                   <Form.Item label="Content" colon={false} >
                                  {getFieldDecorator('content', {
                                
                                      rules: [{ required: true, message: 'Please fill out this field',  min:40, }],
                                    })( <TextArea rows={4} />)}
                                    </Form.Item>
                                    <div className="drawerButton">
                                      <Button onClick={props.onClose} > Cancel</Button>
                                     <Button type="primary" loading={props.drawerButtonLoad} onClick={handleSubmit}>{props.buttonText}</Button>
                                    </div>
                            </Form>  
  );
});
export default CustomizedForm;