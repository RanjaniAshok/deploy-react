import React from 'react';
import {Input} from 'antd';
const {Search}= Input;

class SearchPost extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:this.props.data
		}
}
 searchPost=(e)=>{
        if(e.target.value!==''){
        let searchValue= e.target.value.toLowerCase();
        let datas= this.props.data
        let result = datas.filter(data=>data.title.toLowerCase().includes(searchValue)
          );
      this.props.searchPost(result)
      }
      else{
      this.props.searchPost(this.props.data)
      }
  }
 render(){
 	
	return(
			<Search  placeholder="Search" 
              onChange={this.searchPost} style={{ width: 330 }}/>
		)}

}
export default(SearchPost);
