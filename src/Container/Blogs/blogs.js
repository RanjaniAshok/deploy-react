import React from 'react';
import {connect} from 'react-redux';
import './blogs.scss'
import {Layout,Row,Col,Skeleton, Button,Card} from 'antd';
import * as actions from '../../Redux/Action';
import {store} from '../../Redux/Store';
import TopBar from '../../components/TopBar/topBar';
import CommentBox from '../../components/Blogs/comments';
import Claps from '../../components/Blogs/claps';
import DataList from '../../components/Blogs/dataList';
import moment from 'moment';
const {Content,Sider, } = Layout;
const { Meta } = Card;
class Blogs extends React.Component {
constructor(props){
  super(props);
    this.state={
    cardContentLoading:true
    }
}
componentDidMount() {
 	store.dispatch({type: actions.FETCH_PUBLISHED_POSTS,payload:{
 		pageSize:this.props.blogData.pageSize,offset:this.props.blogData.offset
 	}})
    }
 SignOut=()=>{
        store.dispatch({type:actions.Sign_Out});
      }
render(){
  const {data,blogData,fetchPostLoading}=this.props
  const {email,loggedIn}=this.props.user
  const {blogContentLoading,getComments,getPost,getClaps,getImage,postContentLoading,postImageLoading}=this.props.postData
  const popoverContent=<Button style={{backgroundColor:'#007bec',color:'#fff'}} onClick={this.SignOut}>Sign Out</Button> 
	return(
	      	<Layout>
				<TopBar popoverContent={popoverContent} user={email} loggedIn={loggedIn} />:   
			<Layout>
			    <Content style={{marginTop:''}}>
				    <Row>
					    <Col span={6} className='sider'>
						    <Sider >
						      <DataList data={data} post={getPost} blogData={blogData} fetchPostLoading={fetchPostLoading}/>
							</Sider>
						</Col>
					   <Col offset={7}>
		               <Skeleton loading={blogContentLoading} active>
		                 <Content>
			               <div>
			                 
                                <Card style={{ width:'100%', height:'100%' }}
							        cover={ <Skeleton loading={postImageLoading} active><img alt="" src={getImage} /></Skeleton>}>
								<Skeleton loading={postContentLoading} active>
								  <Meta style={{marginBottom:'10px'}}
							        title={getPost.title}
							        description={getPost.content}
							        />
                                    <div className="postDescription">Posted By:
								     <span> {getPost.email}</span>
								     <p className="postDescription">{moment(getPost.created).format('YYYY-MM-DD')}</p>
							       </div>
							     </Skeleton>
							     <div>
								  <Claps post={getPost.objectId} user={email}
								  loggedIn={loggedIn} clappedUsers={getClaps}
								   blogData={blogData} clapsLoading={postContentLoading}/>
								  </div>
							     <div>
								   <CommentBox user={email} comments={getComments} relationsId={getPost.objectId} commentsData={blogData} loggedIn={loggedIn}/>
								 </div>
							  </Card>
							 </div>
					     </Content>
		             </Skeleton>
		           </Col>
		         </Row>
				</Content>
		    </Layout>
		    </Layout>
	
		    )}
}
 const mapStateToProps=(state)=>{
            return{
                user:state.SignIn,
                data:state.BlogData.listData,
            	blogData:state.BlogData,
            	postData:state.GetPost,
            	fetchPostLoading:state.BlogData.fetchPostLoading,
                  }
              }
          export default connect(mapStateToProps,null)(Blogs);
 