import { Component } from 'react';

class StudentInfoComponent  extends Component {
    render() {
        return ( 
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
            </tr>
            {this.props.list_student.map((student,index) => (
                <tr>
                    <td>{index}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.address}</td>
                </tr>
            ))}
        </table>
        )
    }
}
export default StudentInfoComponent;
