import { useNavigate } from "react-router-dom";
import {useState} from "react"

function Login() {
    const [form,setForm] = useState({})
    const [wrong,setWrong] = useState(false)
    const navigate = useNavigate();
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    function handleSubmit(e) {
        e.preventDefault()
        console.log(form.username,form.password)
        if (form.username === "admin@gmail.com" && form.password === "letmein") {
            navigate(`/employee/${form.username}`)
        } else {
            setWrong(true)
        }
    }
    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                {(wrong) ? <p style={{color:"red"}}>Sai tên đăng nhập và mật khẩu</p> : ""}
                <label htmlFor="username">Username</label><br/>
                <input id="username" name="username" onChange={handleChange}/><br/>
                <label id="password">Password</label><br/>
                <input type="password" id="password" name="password" onChange={handleChange}/><br/> 
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login