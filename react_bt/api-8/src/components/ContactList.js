import {useState,useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function ContactList() {
  const [ContactList,setContactList] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts")
    .then((res)=>{
      setContactList(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[ContactList])
  function handleEdit(id) {
    navigate(`/${id}`)
  }
  function handleDelete(id) {
    
  }
  return (
    <>
        <div style={{overflow:"auto"}}>
            <div style={{float:"left",width:"fit-content"}}><b>Contacts</b></div>
            <div style={{float:"right",width:"fit-content"}}><button onClick={()=>{navigate("/addbook")}} className="addbook">Add Contact</button></div>
        </div>
        <hr/>
        <table style={{borderCollapse: "collapse",width:"100%"}}>
            <thead>
            <tr>
                <th style={{borderBottom: "1px solid black"}}>Name</th>
                <th style={{borderBottom: "1px solid black"}}>Email</th>
                <th style={{borderBottom: "1px solid black"}}>Phone</th>
                <th style={{borderBottom: "1px solid black"}}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {ContactList.map(e=>(
                <tr>
                <td><img alt="" className="avatar" src={e.image}/>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td style={{textAlign:"center"}}>
                    <button className="editbook" onClick={()=>handleEdit(e.id)}>Edit</button>
                    <button className="delbook" onClick={()=>handleDelete(e.id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
  );
}

export default ContactList;
