import "../styles/CustomerList.css"

function CustomerList(props) {
    const {messageListCustomers,customerSelect,customerSelected} = props
    function handleClick(e) {
        customerSelect(e.target.getAttribute("customer-id"))
    }
    return (
        <div className="customer-list">
            {messageListCustomers.map(c=>(
                <div className={"customer-box " + ((customerSelected==c.id)?"active":"")} customer-id={c.id} onClick={handleClick}>
                    <h5 customer-id={c.id}>{new Date(parseInt(c.id)).toLocaleString()}</h5>
                    <p customer-id={c.id}>{(c.messageList[c.messageList.length-1] !== undefined) ? c.messageList[c.messageList.length-1].mess : ""}</p>
                </div>
            ))}
        </div>
    )
}

export default CustomerList