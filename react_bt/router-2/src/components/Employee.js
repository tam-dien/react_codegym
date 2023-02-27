import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Employee() {
    const { username } = useParams()
    const navigate = useNavigate()
    const employees = [
        {
            id: 1,
            name: "Hoa",
            age: 20
        },
        {
            id: 2,
            name: "Khánh",
            age: 25
        },
        {
            id: 3,
            name: "Tú",
            age: 22
        },
    ]
    function handleDetail(id) {
        navigate(`/employeedetail/${id}`)
    }
    return (
    <>
        <div>
            <h3>Chào bạn {username}</h3>
            <table>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                {employees.map(e=>(
                    <tr>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.age}</td>
                        <td><button onClick={()=>handleDetail(e.id)}>Detail</button></td>
                    </tr>
                ))}
            </table>
        </div>
    </>)
}

export default Employee