import { Navigate, useNavigate } from "react-router"

export default function Home() {
    const navigate = useNavigate()


    return(
        <>
            <h1>Get Classy</h1>
    <button onClick={()=>navigate('exhibitions')}>I want to see exhibitions</button>
    <button onClick={()=>navigate('bywhom')}  >Quiz me!</button>
        </>
    )
}