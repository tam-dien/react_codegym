import "../styles/MessageBox.css"
import Message from "./Message"
import {useState} from "react"

function MessageBox(props) {
    const { message_list, send, admin } = props
    const [ message, setMessage ] = useState("") 
    function handleChange(e) {
        setMessage(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        setMessage("")
        send(message)
    }
    return (
        <div className="message-box">
            <div className="messages">
                {message_list.map(m=><Message admin={admin} key={m.id} message={m} />)}
            </div>
            <div className="TypeMessage">
                <form>
                    <input className="form-control" value={message} onChange={handleChange} style={{width:"calc(100% - 61.15px)",display:"inline-block"}} />
                    <button className="btn btn-primary" onClick={handleSubmit}>Send</button>
                </form>
            </div>
        </div>
    )
}

MessageBox.defautProps = {
    admin:false
}

export default MessageBox