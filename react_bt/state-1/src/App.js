import './App.css';

import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.clickNut = this.clickNut.bind(this);
    this.state = {isExpand: false}
  }
  clickNut() {
    this.setState({isExpand: !this.state.isExpand});
  }
  render() {
    return (
      <>
        <div style={{
          backgroundColor: "green",
          color: "white",
          padding: "15px",
          fontWeight: "bold",
        }}>Conditional Rendering</div>
        <button onClick={this.clickNut}>{(this.state.isExpand) ? "Đóng giới thiệu" : "Xem giới thiệu"}</button>
        {(this.state.isExpand) ? <div>
          <h3>Giới thiệu</h3>
          <p>Đoạn giới thiệu hơi dài nên mình lười gõ ahihi</p>
        </div> : null}
      </>
    )
  }
}

export default App;
