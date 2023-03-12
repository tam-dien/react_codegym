// import {  } from "react"
import { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { WebSocket_URL } from "../CONST"
import Loading from "./Loading"
import SendMailForm from "./SendMailForm"

function CustomerSide() {
    const [ messageList, setMessageList ] = useState([])
    const [ idClient, setIdClient ] = useState(null)
    const [ websocket, setWebsocket ] = useState(null)
    const [ sendMail, setSendMail ] = useState(false)
    if (websocket) websocket.onmessage = (event) => {
        var data = event.data
        data = JSON.parse(data)
        var sender = 1
        if (data.type == "first") {
            setIdClient(data.id)
            return
        }
        if (data.type == "second") {
            setSendMail(true)
            return
        }
        if (data.type == "response") {
            sender = 0
            delete data.type
        }
        const newMessageList = [...messageList]
        newMessageList.push({...data,sender:sender})
        setMessageList(newMessageList)
    }
    function connectWebsocket() {
        console.log("cố co nét nè")
        const new_websocket = new WebSocket(WebSocket_URL)
        new_websocket.onopen = (event) => {
            console.log("kết nối")
            new_websocket.send(JSON.stringify({
                type:"client",
            }))
        }
        new_websocket.onerror = (event) => {
            console.log("connect lỗi")
            connectWebsocket()
        }
        setWebsocket(new_websocket)
    }
    // console.log(websocket)
    useEffect(()=>{
        console.log("chạy ịt fét nè")
        connectWebsocket()
    },[])
    function send(data) {
        websocket.send(JSON.stringify({
            mess: data,
        }))
    }
    function sendMailFunc(form) {
        const newForm = {...form}
        newForm.sendmail = true
        websocket.send(JSON.stringify(newForm))
    }
    // console.log(idClient)
    // console.log(messageList)
    return (
        <div style={{height:"100vh"}}>
            {((sendMail) ? <SendMailForm send={sendMailFunc} /> 
            : ( idClient == null ) 
            ? <Loading />
            : <MessageBox message_list={messageList} send={send} />)}
        </div>
    )
}

export default CustomerSide