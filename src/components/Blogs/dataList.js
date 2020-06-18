import React  from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {List, Avatar,Spin} from 'antd';
import * as actions from '../../Redux/Action';
import {store} from '../../Redux/Store';
import SearchPost from '../../components/search';
class DataList extends React.Component {
constructor(props){
  super(props);
    this.state={
    listBgColor:'',
    cardContentLoading:true,
    data:props.data,
    clicked:false

    }
}
 componentDidUpdate(prevProps, prevState) {
  if (prevProps.data !== this.props.data ) {
      this.setState({
         data:this.props.data,
      })  }
     }
 searchPost=(filteredData)=>{
   this.setState({data:filteredData})
         }
 handleInfiniteOnLoad = () => {

 this.setState({loading:true})

  store.dispatch({type:actions.INFINITE_LOAD})
  store.dispatch({type: actions.FETCH_AFTER_SCROLLING,payload:{
		pageSize:this.props.blogData.pageSize,offset:this.props.blogData.offset
	}})

}
  getPost=(objectId)=>{
  	this.setState({clicked:true})
 	store.dispatch({type:actions.GET_POST,payload:objectId})
 }
render(){
	const {data,post}=this.props;
	const {fetchPostLoading,hasMore}=this.props.blogData;
	return(
		<div className="demo-infinite-container">
							       <SearchPost data={data} searchPost={this.searchPost}/>,
							        <InfiniteScroll
							          initialLoad={false}
							          pageStart={0}
							          loadMore={this.handleInfiniteOnLoad}
							          hasMore={!fetchPostLoading && hasMore}
							          useWindow={false} >
								          <List
								            className="dataList"
								            dataSource={this.state.data}
								            renderItem={(item)=> (
								              <List.Item key={item.objectId}
								                style={{backgroundColor:item.objectId===post.objectId?'#BEBEBE':'#F5F5F5'}} >
								                <List.Item.Meta
								                  avatar={
								                     <Avatar size="large" icon="user" />}
								                  title={item.title}
								                  description={item.email}
								                  onClick={()=>this.getPost(item.objectId)} />
								              </List.Item>)} >
								            {fetchPostLoading && hasMore && (
								              <div className="demo-loading-container">
								                  <Spin />
								              </div> )}
								          </List>
							        </InfiniteScroll>
							      </div>
		)}

}
export default DataList;