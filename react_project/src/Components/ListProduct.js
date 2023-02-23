import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './style.css';
// import * as Icon from 'react-bootstrap-icons';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        "listSP":this.props.listSP
      }
      // console.log(this.props.listSP)
    }

    update_list(O) {
      this.state.push(O)
    }

    // render_choose(id) {
    //   return 
    // }
    // style={(elm.id === this.props.choose) ? {"color":"red"} : {}}
    render() {
      return (
        <div className='p-3'>
            <h4>Danh sách sản phẩm</h4>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Đơn vị tính</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { this.props.listSP.map((elm,index)=>{
                    return <tr className={(elm.id === this.props.choose) ? "choose" : ""} > 
                      <td>{index+1}</td>
                      <td>{elm.tensp}</td>
                      <td>{elm.gia}</td>
                      <td>{elm.donvi}</td>
                      <td>
                        <Button variant="info" className="me-1" onClick={(e) => {this.props.edit(elm.id)}}>Sửa</Button>
                        <Button variant="danger" onClick={(e) => {this.props.delete_list(elm.id)}}>Xóa</Button>
                      </td>
                    </tr>
                })} 
              </tbody>
            </Table>
        </div>
      );
    }
  }
  
  export default Header;