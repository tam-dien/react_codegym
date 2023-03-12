import { useState } from "react"

function SendMailForm(props) {
    const { send } = props
    const [ form, setForm ] = useState({})
    const [ error, setError ] = useState([])
    const [ sent, setSent ] = useState(false)
    function handleChange(e) {
        setForm({...form,[e.target.name]:e.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (!form.name || !form.email || !form.phone || !form.message) {
            setError("Type your name, email, phone and message")
            return
        }
        send(form)
        setSent(true)
    }
    return (
        <div style={{
            maxWidth:"500px",
            width: "500px",
            padding: "30px",
            backgroundColor: "rgb(208, 255, 255)",
            borderRadius: "30px",
            borderBottom: "3px solid black",
            top:"50%",left:"50%",
            transform: "translate(-50%,-50%)",
            position:"absolute",
        }}> 
        {(!sent) ? <>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-control" onChange={handleChange} name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={handleChange} name="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="phone" onChange={handleChange} name="phone" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea onChange={handleChange} name="message" className="form-control" id="message" rows="3" />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
            <div style={{color:"red"}}>{error}</div></>
        :<div>Your message have been sent, we will contact you later</div>}
        </div>
    )
}

export default SendMailForm