import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React from 'react'
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import FormProduct from "./Components/FormProduct.js"
import ListProduct from "./Components/ListProduct.js"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "listSP": [
        {"id":1,"tensp":"iphone","gia":120000,"donvi":"Cái"},
        {"id":2,"tensp":"nokia","gia":1000000,"donvi":"Chi"},
      ],
      "value": {
        "tensp":"",
        "gia":"",
        "donvi":"Cái",
      },
      "choose":null,
    }
  }
  update_list = (O) => {
    this.state.listSP.push(O)
    this.setState({
      "listSP": this.state.listSP
    })
  }
  edit_list = (id) => {
    const new_id = this.state.listSP.findIndex((elm) => elm.id === id)
    if (id !== this.state.choose)
      this.setState({
        "value": this.state.listSP[new_id],
        "choose":id
      })
    else this.setState({"choose":null})
    console.log(this.state.listSP)
  }
  delete_list = (id) => {
    const new_id = this.state.listSP.findIndex((elm) => elm.id === id)
    this.setState({
      "listSP": this.state.listSP.splice(0,new_id).concat(this.state.listSP.splice(new_id))
    })
    if (id === this.state.choose) {
      this.setState({
        "choose":null
      })
    }
  }
  updateProduct = (O) => {
    const new_id = this.state.listSP.findIndex((elm) => elm.id === this.state.choose)
    this.state.listSP[new_id] = O;
    this.setState({
      "listSP": this.state.listSP,
      "choose": null
    })
    console.log(this.state.listSP)
  }
  render() {
    const unit = ["Cái","Chiếc"];
    return (
      <>
        <Header />
        <Row>
          <Col md="8"><ListProduct listSP={this.state.listSP} delete_list={this.delete_list} choose={this.state.choose} edit={this.edit_list} /> </Col>
          <Col md="4"><FormProduct unit={unit} update_list={this.update_list} value={this.state.value} choose={this.state.choose} updateProduct={this.updateProduct} /></Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default App;
