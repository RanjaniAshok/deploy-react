import * as actions from '../../Action';

const initialState={
    visible:false
}
const Drawer=(state=initialState,action)=>{
    switch(action.type){
            case actions.OPEN_DRAWER:
               return  {
                ...state,
              visible: true
              }
            case actions.CLOSE_DRAWER:
                return  {
                  ...state,
                  visible: false
          
                  }
            default: return state;
    }
      
}
export default Drawer;
