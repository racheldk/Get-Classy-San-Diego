import { useEffect } from "react"

export default function ImagesByWhom({artworkIDList, quizTitle}){
    
    console.log(artworkIDList)
    console.log(quizTitle)
    
    useEffect(()=>{
        
    },[])
    
    return(
        <>
        <h2>Quiz</h2>
        <h3>{quizTitle}</h3>
        </>
    )
}