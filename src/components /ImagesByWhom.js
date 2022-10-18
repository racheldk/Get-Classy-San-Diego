import { useEffect, useState, Button } from "react";
import axios from "axios";
import Confetti from "react-confetti";

export default function ImagesByWhom({ artworkIDList, quizTitle }) {
    const [artworkList, setArtworkList] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [questionStatus, setQuestionStatus] = useState('unanswered')
    const [answerStatus, setAnswerStatus] = useState(null)

    useEffect(() => {
        let imageRequests = [];
        let imageResponses = [];
        artworkIDList.forEach((id) => {
            imageRequests.push(
                axios.get(
                    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,artist_title,title,artwork_type_title,date_display,image_id,is_public_domain,thumbnail,material_titles,artist_id`,
                    {}
                )
            );
        });
        // console.log(...imageRequests);
        axios
            .all(imageRequests)
            .then(
                axios.spread((...responses) => {
                    // console.log(responses)
                    responses.forEach((response) => {
                        // console.log(response.data);
                        if (
                            (response.data.data.artist_id === 35577 ||
                                response.data.data.artist_id === 35809) &&
                            response.data.data.is_public_domain === true
                        ) {
                            imageResponses.push(response.data.data);
                        }
                    });
                    // console.log(imageResponses);
                    const sortedImageResponses = imageResponses.sort((a, b) => {
                        return a.id - b.id;
                    });
                    // console.log(sortedImageResponses);
                    setArtworkList(sortedImageResponses);
                })
            )
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }, []);

    const handleAnswer = (artwork, artist_id) =>{
        console.log(artwork)
        console.log(artist_id)
        if (artist_id === artwork.artist_id) {
            console.log('correct!')
            setAnswerStatus('correct')
        } else {
            console.log('nope, incorrect')
            setAnswerStatus('incorrect')
        }
        setQuestionStatus('answered')
    }

    const handleNext = () =>{
        setAnswerStatus(null)
        setQuestionStatus('unanswered')
        setQuizIndex(quizIndex+1)
    }

    return (
        <>
            <h2>Quiz</h2>
            <h3>{quizTitle}</h3>
            {artworkList.length>0 && 
            <div>
                <img
                    src={`https://www.artic.edu/iiif/2/${artworkList[quizIndex].image_id}/full/843,/0/default.jpg`}
                    alt={artworkList[quizIndex].thumbnail.alt_text}
                    className="artwork"
                ></img>
                {questionStatus==='unanswered' ? (
                    <>
                    <button onClick={()=>handleAnswer(artworkList[quizIndex], 35577)} >Manet</button>
                    <button onClick={()=>handleAnswer(artworkList[quizIndex], 35809)} >Monet</button>
                    </>
                ): (
                    <>
                    {answerStatus==='correct' ? (
                        <Confetti/>
                    ):(
                        <p>incorrect</p>
                    )}
                    <p>index: {quizIndex}</p>
                    <p>title: {artworkList[quizIndex].title}</p>
                    <p>artist: {artworkList[quizIndex].artist_title}</p>
                    <p>date: {artworkList[quizIndex].date_display}</p>
                    <p>type: {artworkList[quizIndex].artwork_type_title}</p>
                    <p>materials: {artworkList[quizIndex].material_titles}</p>
                    <button onClick={()=>handleNext()}  >Next Question</button>
                    </>
                )}
            </div>
            
            
            }
            {/* {artworkList.map((artwork) => (
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
            ))} */}
        </>
    );
}
