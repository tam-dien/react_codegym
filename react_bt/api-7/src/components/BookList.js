import {useState,useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function BookList() {
  const [bookList,setBookList] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/codegym-vn/mock-api-books/books")
    .then((res)=>{
      setBookList(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[bookList])
  function handleEdit(id) {
    navigate(`/${id}`)
  }
  function handleDelete(id) {
    
  }
  return (
    <>
        <div style={{overflow:"auto"}}>
            <div style={{float:"left",width:"fit-content"}}><b>Library</b></div>
            <div style={{float:"right",width:"fit-content"}}><button onClick={()=>{navigate("/addbook")}} className="addbook">Add a new book</button></div>
        </div>
        <hr/>
        <table style={{borderCollapse: "collapse",width:"100%"}}>
            <thead>
            <tr>
                <th style={{borderBottom: "1px solid black"}}>Title</th>
                <th style={{borderBottom: "1px solid black"}}>Quantity</th>
                <th style={{borderBottom: "1px solid black"}}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {bookList.map(e=>(
                <tr>
                <td>{e.title}</td>
                <td>{e.quantity}</td>
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

export default BookList;
