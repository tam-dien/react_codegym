import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
  
class FormProduct extends React.Component {
    constructor(props) {
        super(props);
        this.data_product = {
            tensp: "",
            gia: "",
            donvi: "",
          };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.id = 2;
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.data_product[name] = value
    }
    createProduct() {
        this.props.update_list({"id":++this.id,"tensp":this.data_product.tensp,"gia":this.data_product.gia,"donvi":this.data_product.donvi})
    }
    updateProduct() {
        this.props.updateProduct(this.data_product)
    }
    render() {
        Object.entries(this.props.value).forEach(([key, value]) => {
            this.data_product[key] = value
        });        
        return (
        <div className='p-3'>
            <h4>Thông tin sản phẩm</h4>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Tên sản phẩm
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="text" placeholder="Nhập tên sản phẩm" name="tensp" Value={this.data_product.tensp} onChange={this.handleInputChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Mã sản phẩm
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="text" placeholder="Nhập mã sản phẩm" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Loại sản phẩm
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Check label="Đồ gia dụng" />
                    <Form.Check label="Đồ điện tử" />
                    <Form.Check label="Quần áo" />
                    <Form.Check label="Sách" />
                    </Col>
                </Form.Group>

                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={4}>
                        Khuyến mãi
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Check type="radio" label="Đang khuyến mãi"/>
                        <Form.Check type="radio" label="Không"/>
                    </Col>
                    </Form.Group>
                </fieldset>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Đơn vị tính
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Select aria-label="Default select example" name="donvi" defaultValue={this.props.value.donvi} onChange={this.handleInputChange} >
                            { this.props.unit.map(elm=>{
                                return <option value={elm}>{elm}</option>
                            })} 
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Giá sản phẩm
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="number" placeholder="Nhập giá sản phẩm" name="gia" defaultValue={this.props.value.gia} onChange={this.handleInputChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Ngày nhập
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="date"  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>
                        Mô tả
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control as="textarea"  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={4}></Form.Label>
                    <Col sm={8}>
                        {(this.props.choose != null) ? <Button variant="dark" className="me-1" onClick={() => this.updateProduct()}>Update</Button> : ""}
                        <Button onClick={() => this.createProduct()}>Save</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
        )
    }
}
  
export default FormProduct;