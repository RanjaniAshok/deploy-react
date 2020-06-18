
import React,{Fragment}  from 'react';
import { Row, Col, Table,Icon} from 'antd';
import moment from 'moment';
// import cookies from 'js-cookie'
class PostTable extends React.Component{
    constructor(props) {
      super(props);
     
       };
      
  render()
 {
    const columns = [
        {
          title: 'Post name',
          dataIndex: 'title',
          ellipsis:true,
          render: text => <a>{text}</a>,
        },
        {
          title: 'Created at',
          dataIndex: 'created',
          sorter: true,
          render:record=>moment(record).format('YYYY-MM-DD HH:mm:ss')
          },
        {
          title: 'Updated at',
          dataIndex: 'updated',
          sorter: true,
        },
        {
          title: '',
          key:"action",
          render:(text, record) => (
            <span
            onClick={(e) => { this.delete(record.key, e); }}>
           <Icon type="delete" theme="twoTone" />
            </span>
          )
    
        },
        
      ];
   
      
       return (
            <Fragment>
                 <Row type="flex" justify="center">
                    <Col span={19}>
                        <Table rowKey={record=>record.objectId} columns={columns} dataSource={this.props.data}/>
                     </Col>
                </Row>
             </Fragment>
        )
    }
}

export default PostTable;