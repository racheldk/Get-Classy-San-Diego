import axios from "axios";
import { useEffect, useState } from "react";
import ArtworkList from "./ArtworkList";

export default function ExhibitionList() {
    const [exhibitionList, setExhibitionList] = useState([]);
    const [artURLs, setArtURLs] = useState([]);
    const [IIIFResults, setIIIFResults] = useState();
    const [imageURL, setImageURL] = useState();
    const [worksByAgent, setWorksByAgent] = useState([])

    // useEffect(() => {
    //     axios
    //         .get("https://api.artic.edu/api/v1/exhibitions?limit=4&include=artworks", {})
    //         .then((res) => {
    //             console.log(res.data);
    //             let hasArtworkListed = [];
    //             for (let exhibition of res.data.data) {
    //                 if (exhibition.artwork_ids.length > 0) {
    //                     hasArtworkListed.push(exhibition);
    //                 }
    //             }
    //             setExhibitionList(hasArtworkListed);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.message);
    //         });
    // }, []);



    // useEffect(() => {
    //     axios
    //         .get("https://api.artic.edu/api/v1/sections?limit=4", {})
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.message);
    //         });
    // }, []);

    // useEffect(() => {
    //     axios
    //         .get("https://api.artic.edu/api/v1/agents?limit=8&fields=id,title,is_artist,artwork_ids", {})
    //         .then((res) => {
    //             console.log(res.data.data);
    //             let artists = []
    //             for (let agent of res.data.data) {
    //                 if (agent.is_artist === true){
    //                     console.log('found an artist!' + agent.title)
    //                     artists.push(agent)
    //                 }
    //             }
    //             let withArtworksListed = []
    //             for (let agent of res.data.data) {
    //                 if (agent.artwork_ids>0) {
    //                     withArtworksListed.push(agent)
    //                 }
    //             }
    //             console.log(withArtworksListed)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.message);
    //         });
    // }, []);

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/agents/35809", {})
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }, []);

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/artworks/search?q=o'keefe", {})
            .then((res) => {
                console.log(res.data);
                setWorksByAgent(res.data.data)
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }, []);
    

    // useEffect(() => {
    //     axios
    //         .get("https://api.artic.edu/api/v1/category-terms?limit=2", {})
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.message);
    //         });
    // }, []);

    // useEffect(() => {
    //     axios
    //         .get("https://api.artic.edu/api/v1/catalogues?limit=2", {})
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.message);
    //         });
    // }, []);
    // 404 error 

    // useEffect(() => {
    //     axios
    //         .get("https://api.artic.edu/api/v1/artwork-types?limit=4", {})
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.message);
    //         });
    // }, []);

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
            {/* {exhibitionList.map((exhibition) => (
                <button
                    key={exhibition.id}
                    onClick={() => handleExhibitionClick(exhibition)}
                >
                    {exhibition.title}
                </button>
            ))}
            {imageURL && <img src={imageURL} alt="artwork" />} */}

            {worksByAgent && worksByAgent.map((work) =>(
                <div key={work.id}>
                <p>{work.title}</p>
                <img src={work.thumbnail.lqip} alt={work.alt_text} height="100px"></img>
                </div>
            ))}
        </>
    );
}
