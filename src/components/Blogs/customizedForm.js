import React from 'react';
import { Button,Form,Input,Typography} from 'antd';
const { TextArea } = Input;
const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
  
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      comment: Form.createFormField({
        ...props.comment,
        value: props.comment.value,
      }),
    };
  },
  onValuesChange(_, values) {
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
    props.form.resetFields()
         };
  return (
    <Form>
      <Form.Item onSubmit={handleSubmit} >
        {getFieldDecorator('comment', {
          rules: [{ required: true, message: 'Add comments' }],
        })(<TextArea rows={4}/>)}
      </Form.Item>
      <Form.Item>
       <Button  loading={props.submitComment} onClick={handleSubmit} type="primary">
       {props.buttonText}
      </Button>
    </Form.Item>
    </Form>
  );
});
export default CustomizedForm;