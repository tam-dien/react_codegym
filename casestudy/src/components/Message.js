function Message(props) {
    const { message } = props
    return (
        <div className={"message-box-outside"}>
            <div className={"message " + ((message.sender != 1) ? "right" : "left")}>
                {message.mess}
                {(message.sender != 1 && message.sender != 0) ? 
                <span className="sender">{message.sender}</span>
                : "" }
            </div>
        </div>
    )
}

export default Message