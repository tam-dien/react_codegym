import {useState,useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

function FormBook() {
    const [form,setForm] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()
    function handleChange(e) {
        form[e.target.name] = e.target.value
        setForm({...form})
    }
    function handleSubmit() {
        if (form.title && form.quantity) {
            alert(`${(id) ? "Edit" : "Add" } book sucessfully`)
            navigate("/")
        } else {
            alert("Điền đầy đủ thông tin")
        }
    }
    useEffect(()=>{
        if (id)
            axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`)
            .then(res=>{
                setForm(res.data)
            })
            .catch(e=>{console.log(e)})
    },[id])
    return (
    <>
        <h2>{(id) ? "Edit book" : "Add a new book"}</h2>
        <label><b>Title</b></label><br/>
        <input name="title" value={form.title} onChange={handleChange}/><br/>
        <label><b>Quantity</b></label><br/>
        <input type="number" value={form.quantity} name="quantity" onChange={handleChange}/><br/>
        <button className="addbook" onClick={handleSubmit}>{(id) ? "Edit" : "Add"}</button>
    </>
    )
}

export default FormBook