import { Component } from 'react';

class Alert  extends Component {
    render() {
        return ( 
        <div className="alert alert-warning" role="alert">
            {this.props.text}
        </div>
        )
    }
}
export default Alert ;
