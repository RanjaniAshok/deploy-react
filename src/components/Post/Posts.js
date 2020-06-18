import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import { Layout, Button,Row, Col, PageHeader,input,Drawer,Form,Input,Icon, Upload,message} from 'antd';
import {BLOG} from '../../Redux/Action';
import {store} from '../../Redux/store';
import PostTable from './postTable';
import cookies from 'js-cookie';
import moment from 'moment';
const { Header,  Content } = Layout;
const { Dragger } = Upload;
const {Search}= input; 
const { TextArea } = Input;
class Post extends React.Component{
  constructor(props) {
    super(props);
    this.state = { visible: false,
      title:'',
      status:'',
    }
     };
     componentDidUpdate(prevProps) {
      if (this.props.status !== prevProps.status) {
        this.onClose();
      }
    }
     handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          store.dispatch({
            type:BLOG,
            payload:{
             title:values.BlogTitle,
             content:values.Content,
             email:cookies.get('user-email')
             }
          } )
         }

      });
    };  
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
   

    onClose = () => {
        this.setState({
          visible: false,
        });
      };

    delete=(key, e)=>{
        console.log("deleted")
          e.preventDefault();
        
      } 

    imageTitle=(e)=>{
        e.preventDefault();
        this.setState({title:e.target.value})
       }

    render(){
      console.log('post',this.props)
     
    const { getFieldDecorator } = this.props.form;
      const props = {
        name: 'file',
        multiple: true,
        action: `https://backendlessappcontent.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/files/Blog/${this.state.title}.jpg` ,
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
        return (
            <Fragment>
                 <Layout>
                    <Header>
                        <Row type ="flex" justify="center">
                            <Col span={20}>
                                <PageHeader
                                    title={this.props.selected}
                                     extra={[ 
                                     <Search key="2" placeholder="Search"
                                     onSearch={value => console.log(value)}style={{ width: 250 }} />,
                                    <Button key="1" type="primary" onClick={this.showDrawer}>Create</Button>
                                            ]}>
                                     <Drawer
                                          width="350"
                                          title="Create"
                                          placement="right"
                                          closable={false}
                                          onClose={this.onClose}
                                          visible={this.state.visible}>
                                            <Layout>
                                              
                                            <Form onSubmit={this.handleSubmit} className="login-form">
                                              <Form.Item label="Blog Title" colon={false}>
                                                {getFieldDecorator('BlogTitle', {
                                                  rules: [{ required: true, message: 'Please input your username!' }],
                                                })(
                                                  <Input
                                                    placeholder="Title"
                                                    onChange={this.imageTitle}
                                                  />,
                                                )}
                                                </Form.Item>
                                                
                                                <Form.Item label="Cover Image" colon={false}>
                                                    {getFieldDecorator('cover-image', {
                                                      rules: [{ required: true, message: 'Please upload an image' }],
                                                    })(<Dragger {...props}>
                                                      <p className="ant-upload-drag-icon">
                                                        <Icon type="inbox" />
                                                      </p>
                                                      <p className="ant-upload-text">Cover Image</p>
                                                      <p>image format:jpg,png</p>
                                                    
                                                      </Dragger>)}
                                                 </Form.Item>
      
                                                 <Form.Item label="Content" colon={false} >
                                                 {getFieldDecorator('Content', {
                                                      rules: [{ required: true, message: 'Please fill out this field' }],
                                                    })( <TextArea rows={4} />)}

                                                 </Form.Item>
                                                 <Form.Item>
                                                   <Button type="primary" htmlType="submit"  className="login-form-button">Save</Button>
                                                   <Button  className="login-form-button" onClick={this.onClose} > Cancel</Button>
                                                 </Form.Item>
                                            </Form>
                                            </Layout>
                                     </Drawer>
                                 </PageHeader>
                             </Col>
                         </Row>                                
                     </Header>
                     <Content>
                       <PostTable data={this.props.tableData}></PostTable>
                           
                    </Content>
                    </Layout>
            </Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
  return{
    title:state.Blog_Creation.title,  
    created:state.Blog_Creation.created,
    tableData:state.Blog_Creation.data,
    status: state.Blog_Creation.status
 }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Post);
  export default connect(mapStateToProps,null)(WrappedNormalLoginForm);