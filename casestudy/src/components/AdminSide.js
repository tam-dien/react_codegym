// import {  } from "react"
import { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { WebSocket_URL } from "../CONST"
import CustomerList from "./CustomerList"
import Login from "./Login"
import Loading from "./Loading"

var websocket = null
var id_client = null
const fake_data = [
    {id:"123456",client_id:"1678028551000",messageList:[
        {id:1,mess:"Xin chào",sender:0},
        {id:2,mess:"hi",sender:1},
        {id:3,mess:"hello",sender:0},
    ]},
    {id:"1234567",client_id:"1678028553000",messageList:[
        {id:1,mess:"Xin chào 2",sender:0},
        {id:2,mess:"hi 2",sender:1},
        {id:3,mess:"hello 2",sender:0},
    ]},
]

function AdminSide() {
    const [ messageListCustomers, setMessageListCustomers ] = useState([])
    const [ customerSelected, setCustomerSelected ] = useState(null)
    const [ admin, setAdmin ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const indexCustomerSelected = messageListCustomers.findIndex(x=>x.id==customerSelected)
    if (websocket && admin) {websocket.onmessage = (event) => {
        var data = event.data
        data = JSON.parse(data)
        if (data.new_customer) {
            const newMessageListCustomers = [...messageListCustomers]
            newMessageListCustomers.unshift({
                id:data.id,
                client_id:data.client_id,
                messageList:[],
            })
            setMessageListCustomers(newMessageListCustomers)
            console.log(newMessageListCustomers)
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
    }}
    useEffect(()=>{
        const try_connect = setInterval(()=>{
            if (!websocket || websocket.readyState == 0) {
                websocket = new WebSocket(WebSocket_URL)
                websocket.onopen = (event) => {
                    clearInterval(try_connect)
                    websocket.send(JSON.stringify({
                        type:"admin",
                    }))
                    setLoading(false)
                }
            }
        },1000)
    },[])
    function send(data) {
        websocket.send(JSON.stringify({
            sender: admin.token,
            mess: data,
            id: customerSelected
        }))
        const newMessageListCustomers = [...messageListCustomers]
        const index = newMessageListCustomers.findIndex(x=>x.id==customerSelected)
        newMessageListCustomers[index].messageList.push({
            id:Math.random()*10000,
            mess: data,
            sender: 0,
        })
        setMessageListCustomers(newMessageListCustomers)
    }
    function customerSelect(customerID) {
        setCustomerSelected(customerID)
    }
    function sendLogin(form,afterSend) {
        websocket.send(JSON.stringify({
            username:form.username,
            password:form.password,
        }))
        websocket.onmessage = (event) => {
            var data = event.data
            data = JSON.parse(data)
            if (data.success) {
                setAdmin(form.username)
                setMessageListCustomers(data.messageListCustomers)
            }
            else afterSend()
        }
    }
    console.log(messageListCustomers)
    return (
        (loading)
        ? <div style={{height:"100vh"}}><Loading /></div>
        : ((admin == null) ? <Login send={sendLogin} /> :
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
        </div>     ) 
    )
}

export default AdminSide