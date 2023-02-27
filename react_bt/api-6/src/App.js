import './App.css';
import {useState,useEffect} from "react"
import axios from "axios"

function App() {
  const [todoList,setTodoList] = useState([])
  useEffect(()=>{
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res=>{
        setTodoList(res.data)
      })
      .catch(e=>console.log(e))
  },[todoList])
  return (
    <div className='container'>
      <h3>Title</h3>
      <input/><br/>
      <button>Submit</button>
      <ul>
        {todoList.map((t)=>(
          <li>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
