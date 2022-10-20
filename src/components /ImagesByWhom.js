import { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { Paper, Box, Button, Container, Typography } from "@mui/material";

export default function ImagesByWhom({ artworkIDList, quizTitle }) {
    const [artworkList, setArtworkList] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [questionStatus, setQuestionStatus] = useState("unanswered");
    const [answerStatus, setAnswerStatus] = useState(null);
    const [score, setScore] = useState(0);

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

    const handleAnswer = (artwork, artist_id) => {
        console.log(artwork);
        console.log(artist_id);
        if (artist_id === artwork.artist_id) {
            console.log("correct!");
            setScore(score + 1);
            setAnswerStatus("correct");
        } else {
            console.log("nope, incorrect");
            setAnswerStatus("incorrect");
        }
        setQuestionStatus("answered");
    };

    const handleNext = () => {
        setAnswerStatus(null);
        setQuestionStatus("unanswered");
        setQuizIndex(quizIndex + 1);
    };

    return (
        <>
            <Typography variant="h3">Quiz</Typography>
            <Typography variant="h4">{quizTitle}</Typography>
            {artworkList.length > 0 && quizIndex < artworkIDList.length - 1 ? (
                <div>
                    <Container>
                        <Typography>Score: {score}</Typography>
                    </Container>
                    <Paper>
                        <Container>
                            <img
                                src={`https://www.artic.edu/iiif/2/${artworkList[quizIndex].image_id}/full/843,/0/default.jpg`}
                                alt={artworkList[quizIndex].thumbnail.alt_text}
                                className="artwork"
                            ></img>
                        </Container>
                        {questionStatus === "unanswered" ? (
                            <Container>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        handleAnswer(
                                            artworkList[quizIndex],
                                            35577
                                        );
                                    }}
                                >
                                    Manet
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        handleAnswer(
                                            artworkList[quizIndex],
                                            35809
                                        )
                                    }
                                >
                                    Monet
                                </Button>
                            </Container>
                        ) : (
                            <>
                                {answerStatus === "correct" ? (
                                    <Confetti />
                                ) : (
                                    <Typography>incorrect</Typography>
                                )}
                                <Container>
                                    <Typography>index: {quizIndex}</Typography>
                                    <Typography>
                                        title: {artworkList[quizIndex].title}
                                    </Typography>
                                    <Typography>
                                        artist:{" "}
                                        {artworkList[quizIndex].artist_title}
                                    </Typography>
                                    <Typography>
                                        date:{" "}
                                        {
                                            artworkList[quizIndex]
                                                .date_disTypographylay
                                        }
                                    </Typography>
                                    <Typography>
                                        type:{" "}
                                        {
                                            artworkList[quizIndex]
                                                .artwork_tyTypographye_title
                                        }
                                    </Typography>
                                    <Typography>
                                        materials:{" "}
                                        {artworkList[quizIndex].material_titles}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleNext()}
                                    >
                                        Next Question
                                    </Button>
                                </Container>
                            </>
                        )}
                    </Paper>
                </div>
            ) : (
                quizIndex >= artworkList.length && (
                    <div>quiz over {quizIndex}</div>
                )
            )}
        </>
    );
}
