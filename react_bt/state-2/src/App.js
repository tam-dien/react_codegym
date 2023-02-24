import './App.css';
import {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.clickCong = this.clickCong.bind(this);
    this.clickTru = this.clickTru.bind(this);
    this.clickNhan = this.clickNhan.bind(this);
    this.clickChia = this.clickChia.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.clickChia = this.clickChia.bind(this);
    this.state = {result: "",value1: "",value2: ""}
  }
  clickCong () {
    this.setState({result: parseInt(this.state.value1)+parseInt(this.state.value2)});
  }
  clickTru () {
    this.setState({result: parseInt(this.state.value1)-parseInt(this.state.value2)});
  }
  clickNhan () {
    this.setState({result: parseInt(this.state.value1)*parseInt(this.state.value2)});
  }
  clickChia () {
    this.setState({result: parseInt(this.state.value1)/parseInt(this.state.value2)});
  }
  handleChange(e) {
    this.setState({value1: e.target.value})
  }
  handleChange1(e) {
    this.setState({value2: e.target.value})
  }
  render() {
    return (
      <>
        <input type="number" onChange={this.handleChange}/><br/>
        <input type="number" onChange={this.handleChange1}/>
        <div>Result: {this.state.result}</div>
        <button onClick={this.clickCong}>+</button>
        <button onClick={this.clickTru}>-</button>
        <button onClick={this.clickNhan}>*</button>
        <button onClick={this.clickChia}>/</button>
      </> 
    )
  }
}

export default App;
