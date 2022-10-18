import "./App.css";
import ExhibitionList from "./components /ExhibitionList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ByWhom from "./components /ByWhom";
import Home from "./components /Home";
import ImagesByWhom from "./components /ImagesByWhom";
import { useState } from "react";

function App() {
    const [artworkIDList, setArtworkIDList] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="exhibitions" element={<ExhibitionList />} />
                <Route
                    path="bywhom"
                    element={
                        <ByWhom
                            setArtworkIDList={setArtworkIDList}
                            artworkIDList={artworkIDList}
                            setQuizTitle={setQuizTitle}
                            quizTitle={quizTitle}
                        />
                    }
                >
                    <Route
                        path="ManetMonet"
                        element={
                            <ImagesByWhom
                                artworkIDList={artworkIDList}
                                quizTitle={quizTitle}
                            />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
