import React from 'react';
import {Button} from 'antd';
import {store} from '../../Redux/Store';
import * as actions from '../../Redux/Action';
 
class Publish extends React.Component{
	     publishPost=(record)=>{
        store.dispatch({type:actions.PUBLISH_POST,payload:record})
            }
       unPublishPost=(record)=>{
       	store.dispatch({type:actions.UN_PUBLISH_POST,payload:record})
       }
 render(){
	return(
		this.props.publish==='false'? (
                      <Button key="1" style={{backgroundColor:'#ff8280',color:'#fff'}}
                       onClick={()=>this.publishPost(this.props.dataId)}>Publish</Button>
                      ):<Button type='primary' key="1" onClick={()=>this.unPublishPost(this.props.dataId)}>UnPublish</Button>
 
		)}

}
export default Publish;