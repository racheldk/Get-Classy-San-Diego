import { Navigate, useNavigate } from "react-router"
import { Container, Button, Typography } from '@mui/material';

export default function Home() {
    const navigate = useNavigate()


    return(
        <>  
        <Container className="header">
            <Typography variant="h1">Get Classy</Typography></Container>
    <Button variant="outlined"  onClick={()=>navigate('exhibitions')}>I want to see exhibitions</Button>
    <Button variant="contained"  color="secondary"onClick={()=>navigate('bywhom')}  >Quiz me!</Button>
        </>
    )
}