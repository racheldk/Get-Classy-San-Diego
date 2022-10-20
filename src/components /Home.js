import { Navigate, useNavigate } from "react-router"
import { Container, Button } from '@mui/material';

export default function Home() {
    const navigate = useNavigate()


    return(
        <>  
        <Container className="header">
            <h1>Get Classy</h1></Container>
    <Button variant="contained" color="#A8273D"  onClick={()=>navigate('exhibitions')}>I want to see exhibitions</Button>
    <Button variant="contained" onClick={()=>navigate('bywhom')}  >Quiz me!</Button>
        </>
    )
}