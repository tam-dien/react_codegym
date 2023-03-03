function Message(props) {
    const { message } = props
    return (
        <div className={"message-box-outside"}>
            <div className={"message " + ((message.sender == 0) ? "right" : "left")}>
                {message.mess}
            </div>
        </div>
    )
}

export default Message