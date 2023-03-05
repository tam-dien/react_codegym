import { useState } from "react"


function Login(props) {
    const { send } = props
    const [ form, setForm ] = useState({})
    const [ error, setError ] = useState([])
    function handleChange(e) {
        setForm({...form,[e.target.name]:e.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (!form.username || !form.password) {
            setError("Type your username and password")
            return
        }
        send(form,afterSend)
    }
    function afterSend() {
        setError("Username or password is incorrect")
    }
    return (
        <div style={{height:"100vh",position:"relative"}}>
            <div style={{
                width:"fit-content",
                position:"absolute",
                top:"50%",left:"50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "rgb(208, 255, 255)",
                padding: "40px 100px",
                borderRadius: "30px",
                borderBottom: "3px solid black",
            }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input className="form-control" onChange={handleChange} name="username" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" onChange={handleChange} name="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
                </form>
                <div style={{color:"red"}}>{error}</div>
            </div>
        </div>
    )
}

export default Login