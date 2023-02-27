import { useNavigate } from "react-router-dom";
import {useState} from "react"

function Login() {
    const [form,setForm] = useState({})
    const navigate = useNavigate();
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    function handleSubmit() {
        navigate(`/username/${form.username}`)
    }
    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
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