import React, { useEffect, useState } from 'react';
import '../styles/MovieCardStyle.css'
import MovieCard from "./MovieCard.jsx";
import { useNavigate } from "react-router-dom";
import SendMovieByIdRequest from "../service/SendMovieByIdRequest.jsx";

const ScreeningCard = ({ screening, additionalDates }) => {
    const navigate = useNavigate();
    const [movieById, setMovieById] = useState([]);
    const [cinemaObject, setCinemaObject] = useState();

    useEffect(() => {
        const fetchCinemaObject = async () => {
            try {
                const movieId = screening.movie.movie_id;
                const cinemaData = await SendMovieByIdRequest(movieId);
                setCinemaObject(cinemaData);
            } catch (error) {
                console.error("Error fetching cinema object:", error);
            }
        };
        if (cinemaObject == null) {
            fetchCinemaObject();
        }
    }, [cinemaObject, screening.movie.movie_id]);

    const goToReservation = (screening_id) => {
        navigate(`/reservation/${screening_id}`);
    };


    return (
        <div className="movie-card">
            <div className="movie-info">
                {cinemaObject ? (
                    <MovieCard key={cinemaObject.movie_id} movie={cinemaObject} />
                ) : (
                    <p>Ładowanie...</p>
                )}
            </div>
            <div className="screening-dates">
                <button onClick={() => goToReservation(screening.screening_id)}>{new Date(screening.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</button>
                {additionalDates && additionalDates.map((date, index) => (
                    <button key={index} onClick={() => goToReservation(date.screening_id)}> {new Date(date.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</button>
                ))}
            </div>
        </div>
    );
};
// new Date(date.date).toISOString().split('T')[0]
export default ScreeningCard;
