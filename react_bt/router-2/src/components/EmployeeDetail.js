import { useParams } from "react-router-dom"

function EmployeeDetail() {
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
    const id = parseInt(useParams().id)
    const index = employees.findIndex(e=>(e.id===id))
    const employee = employees[index]
    return (
        <>
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Age: {employee.age}</p>
        </>
    )
}

export default EmployeeDetail