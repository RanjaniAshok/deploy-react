import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Form.css';
import { Form,  Input, Button, Layout,Row, Col} from 'antd';
import blog from './blog.png';
import { SIGN_UP} from '../../Redux/Action'
import {store} from '../../Redux/Store';

const { Header, Footer, Content } = Layout;
class SignUp extends React.Component{
  state={
    confirmDirty:false
  }
  
  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err,values) => {
        if (!err) {
          store.dispatch({
            type:SIGN_UP,
            payload:{
              firstname:values.firstname,
              lastname:values.lastname,
              email:values.email,
              password:values.password            
              }
          })
      }
    });
  }

  handleConfirmBlur = e => {
     const { value } = e.target;
     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

 compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
   const { form } = this.props;
    if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
     callback();    
  };

  render(){
      const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Layout>
      <Row type="flex" >
      <Col xl={{span:15}} sm={{span:14}} xs={{span:24}}>
      <Layout>
      <Header>
        <Row>
     <Col offset={3}><img src={blog} alt="blog"></img></Col> 
      </Row>
      </Header>
      <Content>
        <Row type="flex" justify="center" align="middle" > 
          <Col span={12}>
      <Form hideRequiredMark={true}  onSubmit={this.handleSubmit} className="login-form"> 
      <Form.Item>
          <Row gutter={8}>  
            <Col span={12}>
            <Form.Item colon={false} label="FirstName">
          {getFieldDecorator('firstname', {
            rules: [{ required: true,whitespace: true,  message: 'Please input your FirstName!'},
           
          ],
           
          })(
            <Input placeholder="FirstName" />,
          )}
        </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item colon={false}  label="LastName">
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please input your LastName!' }],
          })(
            <Input
              placeholder="LastName"
            />,
          )}
          </Form.Item>
            </Col>
          </Row>
        </Form.Item>
          <Form.Item colon={false}  label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input placeholder="Email"/>,)}
        </Form.Item>
        <Form.Item colon={false} label="Password" >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                min:6,
                max:10,
                pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*&])[A-Za-z\d@$!*&]{6,64}$/,
                message: 'Password is too weak!!'
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password type ="password"  placeholder="Password" />)}
          </Form.Item>
 
        <Form.Item colon={false}  label="Confirm Password" >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password  placeholder="Confirm Password" onBlur={this.handleConfirmBlur}/>)}
        </Form.Item>
        
        <Form.Item colon={false}  className="form-item-button">
        <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
        </Button>
        </Form.Item>
      </Form>
      </Col>
        </Row>
       </Content>
        <Footer style={{ textAlign: 'center' }}>Already have an Account? <Link to="/SignIn">Sign in</Link></Footer>
    </Layout>
      </Col>
      <Col xl={{span:9}} sm ={{span:10}} xs={{span:24}}className="bg-image">
        <div className="imgBox">
        </div>
      </Col>
    </Row>
      </Layout>
      </Fragment>      
           );
      }
    }
    
    const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignUp);
    export default (WrappedNormalLoginForm);