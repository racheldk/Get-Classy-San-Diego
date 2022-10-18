import { useEffect, useState } from "react";
import axios from "axios";
import { toBeEmptyDOMElement } from "@testing-library/jest-dom/dist/matchers";
import { Navigate, useNavigate } from "react-router";
import ImagesByWhom from "./ImagesByWhom";

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
        // axios
        //     .get(
        //         "https://api.artic.edu/api/v1/artworks/87467?fields=id,artist_title,title,artwork_type_display,date_display,image_id,is_public_domain,thumbnail,material_titles",
        //         {}
        //     )
        //     .then((res) => {
        //         console.log(res.data.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         alert(error.message);
        //     });
    },[]);

    const getImages = (worksIDs) => {
        // map through allWorksList
        console.log("get those images!");
        console.log(worksIDs);
        let requestList = [];
        worksIDs.forEach((id) => console.log(id));
        // worksIDs.forEach((element) => {
        //     console.log(element);
        //     requestList.push(
        //         axios.get(
        //             `https://api.artic.edu/api/v1/artworks/${element}?fields=id,artist_title,title,artwork_type_display,date_display,image_id,is_public_domain,thumbnail,material_titles`
        //         )
        //     );
        // });
        console.log(requestList);
    };



    return (
        <>{quizTitle ? (
            <ImagesByWhom artworkIDList={artworkIDList} quizTitle={quizTitle}/>
        ):(
            <>
            <h2>Wait, who did this?</h2>
            <button onClick={() => handleManetMonetClick()}>
                Manet or Monet
            </button>
            <button>another quiz</button>
            <button>yet another quiz</button></>
        )}
            
        </>
    );
}
