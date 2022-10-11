import axios from "axios"
import { useEffect } from "react"

export default function ArtworkList({artURLs}) {

    useEffect(()=>{
        axios.all([artURLs]).then(axios.spread((res) =>{
            console.log(res)
        }))

    },[artURLs])

    return(
        <>
        <h3>ArtworkList</h3>
        </>
    )
}