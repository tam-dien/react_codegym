// import {  } from "react"
import { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { WebSocket_URL } from "../CONST"

var websocket = null
var id_client = null
var sender = null

function CustomerSide() {
    const [ messageList, setMessageList ] = useState([])
    if (websocket) websocket.onmessage = (event) => {
        var data = event.data
        data = JSON.parse(data)
        if (data.first) {
            sender = data.sender
            return
        }
        const newMessageList = [...messageList]
        newMessageList.push({...data,sender:1})
        setMessageList(newMessageList)
    }
    useEffect(()=>{
        websocket = new WebSocket(WebSocket_URL)
        websocket.onopen = (event) => {
            const d = new Date()
            id_client = d.getTime()
            websocket.send(JSON.stringify({
                id:id_client,
                type:"client",
            }))
        }
        setMessageList([])
    },[])
    function send(data) {
        websocket.send(JSON.stringify({
            mess: data,
        }))
        const newMessageList = [...messageList]
        newMessageList.push({
            id:Math.random()*10000,
            mess:  data,
            sender: 0,
        })
        setMessageList(newMessageList)
    }
    return (
        <div style={{height:"100vh"}}>
            <MessageBox message_list={messageList} send={send} />
        </div>
    )
}

export default CustomerSide