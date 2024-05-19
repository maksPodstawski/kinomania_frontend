import React, {useEffect, useState} from 'react';
import '../styles/cinemasStyles.css'
import Header from "./Header.jsx";
import { useParams } from 'react-router-dom';
import MovieCard from "./MovieCard.jsx";
import SendScreeningsRequest from "../service/SendScreeningsRequest.js";
import ScreeningCard from "./ScreeningCard.jsx";

const ScreeningForCinema = ({ cinema }) => {

    const { city } = useParams();

    const [screenings, setScreenings] = useState([]);
    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const screeeningsData = await SendScreeningsRequest(city);
                console.log(screeeningsData);
                setScreenings(screeeningsData);
            } catch (error) {
                console.error("Error fetching screeenings:", error);
            }
        };

        fetchScreenings();
    }, [city]);

    let renderedMoviesTab = [];
    const renderedMoviesMap = new Map();
    const renderedMovies = new Set();
    return (
        <>
            <Header />
            <div>
                <div>
                    <h1>Screenings dla miasta: {city}</h1>
                    <div className="screenings-container">
                        {screenings && screenings.length > 0 ? (
                            screenings.forEach(screening => {
                                const movieId = screening.movie.movie_id;
                                if (renderedMoviesMap.has(movieId)) {
                                    const existing = renderedMoviesMap.get(movieId);
                                    existing.additionalDates.push({
                                        screening_id: screening.screening_id,
                                        date: screening.date
                                    });
                                } else {
                                    renderedMoviesMap.set(movieId, {
                                        screening: screening,
                                        additionalDates: []
                                    });
                                }
                            }),
                                Array.from(renderedMoviesMap.values()).map((item, index) => (
                                    <div key={index} className="screening-item">
                                        <ScreeningCard screening={item.screening} additionalDates={item.additionalDates} />
                                    </div>
                                ))
                        ) : (
                            <p>Ładowanie...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScreeningForCinema;