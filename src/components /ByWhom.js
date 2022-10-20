import { useEffect } from "react";
import axios from "axios";
import ImagesByWhom from "./ImagesByWhom";
import { Typography, Button } from "@mui/material";

export default function ByWhom({artworkIDList, setArtworkIDList, setQuizTitle, quizTitle}) {

    const handleManetMonetClick = () => {
        console.log('quiz clicked')
        setQuizTitle("Manet or Monet?");
    };

    useEffect(() => {
        console.log("getting artworks");
        let worksIDs = [];
        axios
            .get(
                `https://api.artic.edu/api/v1/artworks/search?q=Monet`,
                {}
            )
            .then((res) => {
                // console.log(res.data.data);
                res.data.data.forEach((element) => {
                    worksIDs.push(element.id);
                });
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
        axios
            .get(
                `https://api.artic.edu/api/v1/artworks/search?q=Manet`,
                {}
            )
            .then((res) => {
                // console.log(res.data.data);
                res.data.data.forEach((element) => {
                    worksIDs.push(element.id);
                });
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
        console.log(worksIDs);
        setArtworkIDList(worksIDs);
    },[setArtworkIDList]);


    return (
        <>{quizTitle ? (
            <ImagesByWhom artworkIDList={artworkIDList} quizTitle={quizTitle}/>
        ):(
            <>
            <Typography variant="h3">Wait, who did this?</Typography>
            <Button size="large" variant="contained" onClick={() => handleManetMonetClick()}>
                Manet or Monet
            </Button>
            </>
        )}
            
        </>
    );
}
