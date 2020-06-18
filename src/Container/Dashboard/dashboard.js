import React  from 'react';
import {connect} from 'react-redux';
import { Layout, Row, Col,Button} from 'antd';
import * as actions from '../../Redux/Action';
import {store} from '../../Redux/Store';
import ShowDrawer from '../../components/Drawer/drawer';
import TopBar from '../../components/TopBar/topBar';
import TableData from '../../components/Dashboard/table';
import PageHead from '../../components/Dashboard/PageHeader';
const { Header,  Content } = Layout;
class Dashboard extends React.Component{
  constructor(props) {
       super(props);
        this.state = {
            visible: false,
            selected:'Dashboard',
            drawerTitle:'Create',
            data:props.tableData,
          
          }
        }
   componentDidMount(){
            store.dispatch({type: actions.FETCH_POSTS,payload:this.props.user.email})
            this.setState({data:this.props.tableData})
                  } ;    
        
 componentDidUpdate(prevProps, prevState) {
  if (prevProps.tableData !== this.props.tableData) {
      this.setState({
         data:this.props.tableData,
      })  }
       }
   searchPost=(filteredData)=>{
        this.setState({data:filteredData})
        
      }
     SignOut=()=>{
        store.dispatch({type:actions.Sign_Out});
      }
      handleSubmit = values => {
         store.dispatch({ type:actions.CREATE_POST, payload:{title:values.postTitle,
                  content:values.content,
                  email:this.props.user.email,
                  imageId:`${this.props.imageId}.jpg`
                  } })
        // store.dispatch({ type:actions.GET_IMAGE })
     }
            render(){
           const popoverContent = <Button style={{backgroundColor:'#007bec',color:'#fff'}} onClick={this.SignOut}>Sign Out</Button>
           const {post,tableDataLoading}=this.props
           const {email,loggedIn}=this.props.user
                 return(
                        <Layout>
                            <Header>
                                <TopBar popoverContent={popoverContent} user={email} loggedIn={loggedIn}/>
                            </Header>
                            <Content>
                                <div>
                                    <Row type ="flex" justify="center">
                                      <Col span={21}>
                                         <PageHead  searchPost={this.searchPost} data={this.props.tableData}/>
                                         </Col>
                                      </Row>
                                </div>
                                  <div>
                                     <Row type ="flex" justify="center">
                                        <Col span={19}>
                                          <TableData tableData={this.state.data} publish={post.publish}  tableDataLoading={tableDataLoading} publishButtonLoad={post.publishButtonLoad} unPublishButtonLoad={post.unPublishButtonLoad}/>
                                         
                                        </Col>   
                                     </Row>
                                  </div>
                            </Content>
                            <ShowDrawer  visible={this.props.visible} value={post.value} handleSubmit={this.handleSubmit} drawerTitle={this.state.drawerTitle} drawerButtonLoad={post.drawerButtonLoad}  />
                          </Layout> 
               
             ) }
        }
        const mapStateToProps=(state)=>{
            return{
                post:state.GetPost,
                user:state.SignIn,
                fetch:state.FetchData,
                tableData:state.FetchData.data,
                tableDataLoading:state.FetchData.tableDataLoading,
                searchedData:state.FetchData.searchedData,
                visible:state.Drawer.visible,
                imageId:state.FetchData.imageId,
              }
          }
          export default connect(mapStateToProps,null)(Dashboard);
