import { useParams } from "react-router-dom";

function Home() {
    const { username } = useParams()
    return (
    <>
        <div>
            Chào bạn {username}
        </div>
    </>)
}

export default Home