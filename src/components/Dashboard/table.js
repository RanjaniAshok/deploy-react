import React  from 'react';
import {Table,Popconfirm,Icon,Spin} from 'antd';
import {store} from '../../Redux/Store';
import {Link} from 'react-router-dom';
import Publish from './publish'
import moment from 'moment';

import * as actions from '../../Redux/Action';
class TableData extends React.Component{
  constructor(props){
  super(props);
    this.state={
    published: false
    }
    }
     handleDelete=(record)=>{
     store.dispatch({type:actions.CLEAR_POST,payload:record})
       }
        render(){
        	 const columns = [ {
                    title: 'Post name',
                    dataIndex: 'title',
                    sorter:(a,b)=> a.title.length - b.title.length,
                    ellipsis:true,
                    key: 'name',
                    render: (text,record)=> <Link to = {`post/${record.objectId}`}>{text}</Link>
                  
                  },
                  {
                    title: 'Created at',
                    dataIndex: 'created',                   
                    sorter:(a,b)=> new Date(a.created) - new Date(b.created),
                    defaultSortOrder:'descend',
                    key: 'created',
                    render:record=>moment(record).format('YYYY-MM-DD HH:mm:ss')
                    },
                  {
                    title: 'Updated at',
                    dataIndex: 'updated',
                    key: 'updated',
                    sorter:(a,b)=> new Date(a.created) - new Date(b.created),
                    defaultSortOrder:'descend',
                    render:record=>{
                      if(record=== null){
                       return 'Not updated';
                     }
                     return moment(record).format('YYYY-MM-DD HH:mm:ss')
                 }
                    
                   },
                  {
                    title: '',
                    key:"delete",
                     width: '15%',
                    render:(text, record) => 
                    this.props.tableData.length >= 1 ? (
                      <span>
                      <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" style={{color:'red'}}/>
                      </Popconfirm>
                    </span>
                    ):null,
                        },
               {
                    title: '',
                    key:"publish",
                     width: '15%',
                    render:(text, record) => <Publish publish={record.publish}
                     dataId={record} publishButtonLoad={this.props.publishButtonLoad} unPublishButtonLoad={this.props.unPublishButtonLoad}/>
              }
              ]       
        	return(
            <Spin spinning={this.props.tableDataLoading}>
        		     <Table rowKey={record => record.objectId} columns={columns} dataSource={this.props.tableData}
                                         pagination={{ defaultPageSize: 6}}/>
                         
            </Spin>
                                     
        ) }
        }
        export default TableData;