// import {  } from "react"
import { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { WebSocket_URL } from "../CONST"
import Loading from "./Loading"

var websocket = null
var id_client = null
var sender = null

function CustomerSide() {
    const [ messageList, setMessageList ] = useState([])
    const [ idClient, setIdClient ] = useState(null)
    if (id_client) websocket.onmessage = (event) => {
        var data = event.data
        data = JSON.parse(data)
        const newMessageList = [...messageList]
        newMessageList.push({...data,sender:1})
        setMessageList(newMessageList)
    }
    useEffect(()=>{
        const try_connect = setInterval(()=>{
            if (!websocket || websocket.readyState == 0) {
                websocket = new WebSocket(WebSocket_URL)
                websocket.onopen = (event) => {
                    clearInterval(try_connect)
                    websocket.send(JSON.stringify({
                        type:"client",
                    }))
                    websocket.onmessage = (event) => {
                        var data = event.data
                        data = JSON.parse(data)
                        setIdClient(data.id)
                    }
                }
            }
        },1000)
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
    console.log(idClient)
    return (
        <div style={{height:"100vh"}}>
            {( idClient == null ) 
            ? <Loading />
            : <MessageBox message_list={messageList} send={send} />}
        </div>
    )
}

export default CustomerSide