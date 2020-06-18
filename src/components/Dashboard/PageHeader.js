import React from 'react';
import {PageHeader,Button} from 'antd';
import SearchPost from '../../components/search';
import * as actions from '../../Redux/Action';
import {store} from '../../Redux/Store';
class PageHead extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
            data:''

             }
        }
    showDrawer = () => {
	    store.dispatch({type:actions.OPEN_DRAWER})
	    };
        render(){
    return(

		 <PageHeader
            title='Dashboard'
            extra={[ 
             <SearchPost key="2"  searchPost={this.props.searchPost} data={this.props.data}/>,
             <Button key="1" type="primary" onClick={this.showDrawer}>Create</Button>
                ]}>
        </PageHeader>
		)

}
}
export default(PageHead);
