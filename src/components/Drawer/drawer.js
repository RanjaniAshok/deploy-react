import React from 'react';
import { Drawer} from 'antd';
import * as actions from '../../Redux/Action';
import {store} from '../../Redux/Store';
import DrawerForm from './drawerForm'

class ShowDrawer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      imageTitle:'',
      loading:false,

       }
     };
    showDrawer = () => {
    store.dispatch({type:actions.OPEN_DRAWER})

       };
  onClose = () => {
      store.dispatch({type:actions.CLOSE_DRAWER})
       };
     render(){
      const {drawerButtonLoad,image,value,handleSubmit,drawerTitle,visible}=this.props
        return (
                <Drawer
                      width="350"
                      title={this.props.drawerTitle}
                      placement="right"
                      destroyOnClose={true}
                      onClose={this.onClose}
                      visible={visible}>

                   <DrawerForm onClose={this.onClose} value={value} image={image}
                     handleSubmit={handleSubmit}
                     drawerButtonLoad={drawerButtonLoad}
                     buttonText={drawerTitle}
                      />
                </Drawer>
        )
    }
}
  export default ShowDrawer;






