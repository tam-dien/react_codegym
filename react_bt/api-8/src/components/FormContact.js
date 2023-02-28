import {useState,useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

function FormContact(props) {
    const [form,setForm] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()
    function handleChange(e) {
        setForm({...form,[e.target.name]:e.target.value})
    }
    function handleSubmit() {
        setForm({name:"hi"})
        if (form.name && form.email && form.phone) {
            alert(`${(id) ? "Edit" : "Add" } contact sucessfully`)
            navigate("/")
        } else {
            alert("Điền đầy đủ thông tin")
        }
    }
    function handleImage(e) {
        const photo = e.target.files[0]
        const formData = new FormData()
        formData.append("file", photo)
        axios
            .post("https://v2.convertapi.com/upload", formData)
            .then(res => {
                setForm({...form,image:res.data.Url})
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(()=>{
        console.log('có')
        if (id)
            axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${id}`)
            .then(res=>{
                setForm(res.data)
            })
            .catch(e=>{console.log(e)})
    },[id])
    console.log('rì')
    return (
    <>
        <h2>{(id) ? "Edit book" : "Add a new book"}</h2>
        <div>
            <img alt="" className="avatar" src={form.image} width="50" height="50"/>
            <label htmlFor="uploadimage" className="uploadimage">{(id) ? "Edit" : "Add"} Image</label><br/>
            <input type="file" accept="image/*" id="uploadimage" onChange={handleImage} name="uploadimage" style={{display:"none"}}/>
        </div>
        <label><b>Name</b></label><br/>
        <input name="name" value={form.name} onChange={handleChange}/><br/>
        <label><b>Email</b></label><br/>
        <input type="email" value={form.email} name="email" onChange={handleChange}/><br/>
        <label><b>Phone</b></label><br/>
        <input value={form.phone} name="phone" onChange={handleChange}/><br/>
        <button className="addbook" onClick={handleSubmit}>{(id) ? "Edit" : "Add"}</button>
    </>
    )
}

export default FormContact