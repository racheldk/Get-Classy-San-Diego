import axios from "axios";
import { useEffect, useState } from "react";
import ArtworkList from "./ArtworkList";

export default function ExhibitionList() {
    const [exhibitionList, setExhibitionList] = useState([]);
    const [artURLs, setArtURLs] = useState([]);
    const [IIIFResults, setIIIFResults] = useState();
    const [imageURL, setImageURL] = useState();

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/exhibitions", {})
            .then((res) => {
                console.log(res.data.data);
                let hasArtworkListed = [];
                for (let exhibition of res.data.data) {
                    if (exhibition.artwork_ids.length > 0) {
                        hasArtworkListed.push(exhibition);
                    }
                }
                setExhibitionList(hasArtworkListed);
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }, []);

    const handleExhibitionClick = (exhibition) => {
        console.log(exhibition);
        console.log(exhibition.id);
        console.log(exhibition.artwork_ids);
        let artworkURLs = [];
        for (let id of exhibition.artwork_ids) {
            artworkURLs.push(
                axios.get(`https://api.artic.edu/api/v1/artworks/${id}`, {})
            );
        }
        console.log(artworkURLs);
        setArtURLs(artworkURLs);
        axios
            .get(
                `https://api.artic.edu/api/v1/artworks/${exhibition.artwork_ids[0]}`
            )
            .then((res) => {
                console.log(res.data);
                setImageURL(`${res.data.config.iiif_url}/${res.data.data.image_id}/full/843,/0/default.jpg`);
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    };

    // if (artURLs.length > 0) {
    //     return <ArtworkList artURLs={artURLs} />
    // }

    return (
        <>
            <h2>Exhibition List</h2>
            {exhibitionList.map((exhibition) => (
                <button
                    key={exhibition.id}
                    onClick={() => handleExhibitionClick(exhibition)}
                >
                    {exhibition.title}
                </button>
            ))}
            {imageURL && <img src={imageURL} alt="artwork" />}
        </>
    );
}
