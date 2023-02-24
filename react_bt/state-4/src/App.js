import './App.css';
import {Component} from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {list:[],item:"",count:0}
  }
  handleChange = (e) => {
    this.setState({item:e.target.value})
  }
  handleAddItem = () => {
    if (this.state.item !== "") {
      const new_list = [...this.state.list]
      new_list.push({id:this.state.count+1,value:this.state.item})
      this.setState({list:new_list,count:this.state.count+1})
    }
    console.log(this.state.list)
  }
  render() {
    return (
    <div style={{textAlign:"center"}}>
      <h1 style={{fontSize: "30px"}}>Todo List</h1>
      <input onChange={this.handleChange}/>
      <button onClick={this.handleAddItem}>Add</button>
      <ul>
        {this.state.list.map(i => (
          <li>{i.value}</li>
        ))}
      </ul>
    </div>)
  }
}

export default App;
