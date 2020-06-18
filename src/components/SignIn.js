import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import { Form,  Input, Button,Row, Col,Layout } from 'antd';
import './Form.css';
import FormItem from 'antd/lib/form/FormItem';
import {Link} from 'react-router-dom';
import blog from '../blog.png';
import { SIGN_IN} from '../Redux/Action';
import {store} from '../Redux/store';

const { Header, Footer, Content } = Layout;

class SignIn extends React.Component
{
  handleSubmit = e => {
   e.preventDefault();
        this.props.form.validateFields((err,values) => {
          if (!err) {
        store.dispatch({type:SIGN_IN, payload:
          {
            email:values.email,
            password:values.password,
           }})
           }
        });
       
      };
      
     render()
      {
      const { getFieldDecorator } = this.props.form;
        return (
   <Fragment>
      <Row type="flex" >
         <Col xl={{span:15}} sm={{span:14}} xs={{span:24}}>
           <Layout>
           <Header>
             <Row>
           <Col offset={3}>
             <img src={blog} alt="blog"></img>
            </Col> 
             </Row>
             </Header>
           <Content>
              <Row type="flex" justify="center" align="middle" > 
               <Col span={12}>
                 <Form hideRequiredMark={true} onSubmit={this.handleSubmit} className="login-form">
                   <Form.Item colon={false} label="Email">
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

            <Form.Item colon={false} label="Password">
             {getFieldDecorator('password', {
                rules: [{ required: true,min:6,max:10, message: 'Please input your Password!' }],
              })
               (<Input.Password
                  type="password"
                  placeholder="Password"
                />,)}
            </Form.Item>

            <FormItem><a href="#" className="login-form-forgot">Forgot Password ?</a></FormItem>
            <Form.Item className="form-item-button">
          <Button type="primary" htmlType="submit" className="login-form-button">Sign In
              </Button> 
            </Form.Item>
          </Form>
          </Col>
        </Row>
       </Content>
      <Footer style={{ textAlign: 'center' }}>
      Don't have an Account? <Link to="/SignUp">Sign up</Link>
      </Footer>
      </Layout>
      </Col>
      <Col xl={{span:9}} sm ={{span:10}} xs={{span:24}}className="bg-image">
        <div className="imgBox">
        </div>
      </Col>
    </Row>
        </Fragment>

        );
      
      } 
    }
    const mapStateToProps=(state)=>{
      return{
       
     }
    }
    
   
 const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignIn);

export default connect(mapStateToProps,null)(WrappedNormalLoginForm);
