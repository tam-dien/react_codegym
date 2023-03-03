// import {  } from "react"
import { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { WebSocket_URL } from "../CONST"
import CustomerList from "./CustomerList"

var websocket = null
var id_client = null
const fake_data = [
    {id:"123456",messageList:[
        {id:1,mess:"Xin chào",sender:0},
        {id:2,mess:"hi",sender:1},
        {id:3,mess:"hello",sender:0},
    ]},
    {id:"1234567",messageList:[
        {id:1,mess:"Xin chào 2",sender:0},
        {id:2,mess:"hi 2",sender:1},
        {id:3,mess:"hello 2",sender:0},
    ]},
]

function AdminSide() {
    const [ messageListCustomers, setMessageListCustomers ] = useState(fake_data)
    const [ customerSelected, setCustomerSelected ] = useState("123456")
    const indexCustomerSelected = messageListCustomers.findIndex(x=>x.id===customerSelected)
    if (websocket) websocket.onmessage = (event) => {
        var data = event.data
        data = JSON.parse(data)
        if (data.new_customer) {
            const newMessageListCustomers = [...messageListCustomers]
            newMessageListCustomers.push({
                id:data.id,
                messageList:[]
            })
            setMessageListCustomers(newMessageListCustomers)
            return
        }
        const newMessageListCustomers = [...messageListCustomers]
        const index = newMessageListCustomers.findIndex(x=>x.id===data.sender)
        newMessageListCustomers[index].messageList.push({
            "id":data.mess_id,
            "mess":data.mess,
            "sender":1,
        })
        setMessageListCustomers(newMessageListCustomers)
    }
    useEffect(()=>{
        websocket = new WebSocket(WebSocket_URL)
        websocket.onopen = (event) => {
            const d = new Date()
            id_client = d.getTime()
            websocket.send(JSON.stringify({
                id:id_client,
                type:"admin",
            }))
        }
        setMessageListCustomers(fake_data)
    },[])
    function send(data) {
        websocket.send(JSON.stringify({
            sender: "Điền",
            mess: data,
            id: customerSelected
        }))
        const newMessageListCustomers = [...messageListCustomers]
        const index = newMessageListCustomers.findIndex(x=>x.id===customerSelected)
        newMessageListCustomers[index].messageList.push({
            id:Math.random()*10000,
            mess: data.mess,
            sender: 0,
        })
        setMessageListCustomers(newMessageListCustomers)
    }
    function customerSelect(customerID) {
        setCustomerSelected(customerID)
    }
    return (
        <div className="row" style={{height:"100vh"}}>
            <div className="col-3">
                <CustomerList customerSelected={customerSelected} customerSelect={customerSelect} messageListCustomers={messageListCustomers} />
            </div>
            <div className="col-9">
                {(customerSelected != null) 
                    ? <MessageBox message_list={messageListCustomers[indexCustomerSelected].messageList} send={send} />
                    : ""
                }
            </div>
        </div>      
    )
}

export default AdminSide