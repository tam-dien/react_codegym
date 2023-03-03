import "../styles/CustomerList.css"

function CustomerList(props) {
    const {messageListCustomers,customerSelect,customerSelected} = props
    function handleClick(e) {
        customerSelect(e.target.getAttribute("customer-id"))
    }
    return (
        <div className="customer-list">
            {messageListCustomers.map(c=>(
                <div className={"customer-box " + ((customerSelected===c.id)?"active":"")} customer-id={c.id} onClick={handleClick}>
                    <h4 customer-id={c.id}>{c.id}</h4>
                    <p customer-id={c.id}>{c.messageList[c.messageList.length-1].mess}</p>
                </div>
            ))}
        </div>
    )
}

export default CustomerList