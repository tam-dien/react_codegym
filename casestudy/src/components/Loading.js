import { useEffect, useState } from "react"
import "../styles/Loading.css"

function Loading(props) {
    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log("run loading")
            if (dot.length == 3) {
                setDot(".")
                return
            }
            setDot(dot+".")
        },500)
        return () => clearInterval(interval)
    })
    const [ dot, setDot ] = useState(".")
    return (
        <div className="loading-outside">
            <div className="loading-inside">
                <div className="spinner-grow" role="status"><span className="sr-only"></span></div>
                <br/>Loading{dot}
            </div>
        </div>
    )
}

export default Loading