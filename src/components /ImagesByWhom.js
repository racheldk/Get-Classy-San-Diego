import { useEffect, useState } from "react";
import axios from "axios";

export default function ImagesByWhom({ artworkIDList, quizTitle }) {
    const [artworkList, setArtworkList] = useState([]);

    useEffect(() => {
        let imageRequests = [];
        let imageResponses = [];
        artworkIDList.forEach((id) => {
            imageRequests.push(
                axios.get(
                    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,artist_title,title,artwork_type_display,date_display,image_id,is_public_domain,thumbnail,material_titles,artist_id`,
                    {}
                )
            );
        });
        console.log(...imageRequests);
        axios.all(imageRequests).then(
            axios.spread((...responses) => {
                // console.log(responses)
                responses.forEach((response) => {
                    console.log(response.data);
                    if (
                        (response.data.data.artist_id === 35577 ||
                            response.data.data.artist_id === 35809) &&
                        response.data.data.is_public_domain === true
                    ) {
                        imageResponses.push(response.data.data);
                    }
                });
                console.log(imageResponses);
                const sortedImageResponses = imageResponses.sort((a, b) => {
                    return a.id - b.id;
                });
                console.log(sortedImageResponses);
                setArtworkList(sortedImageResponses);
            })
        );
    }, []);

    return (
        <>
            <h2>Quiz</h2>
            <h3>{quizTitle}</h3>
            {artworkList.map((artwork) => (
                <div>
                    <img
                        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                        alt={artwork.thumbnail.alt_text}
                    ></img>
                    <p>Artwork id: {artwork.id}</p>
                    <p>Title: {artwork.title}</p>
                    <p>by: {artwork.artist_title}</p>
                    <p>
                        public domain:{" "}
                        {artwork.is_public_domain ? "yes" : "NOOOOOOOO"}
                    </p>
                </div>
            ))}
        </>
    );
}
