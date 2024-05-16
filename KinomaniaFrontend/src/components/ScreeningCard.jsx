import React, {useEffect, useState} from 'react';
import '../styles/MovieCardStyle.css'
import MovieCard from "./MovieCard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import SendMovieByIdRequest from "../service/SendMovieByIdRequest.jsx";

const ScreeningCard = ({ screening }) => {

    const navigate = useNavigate();


    const [movieById, setMovieById] = useState([]);

    const [cinemaObject, setCinemaObject] = useState();

    useEffect(() => {
        const fetchCinemaObject = async () => {
            try {
                const movieId = screening.movie.movie_id;
                const cinemaData = await SendMovieByIdRequest(movieId);
                console.log(cinemaData);
                setCinemaObject(cinemaData);
            } catch (error) {
                console.error("Error fetching cinema object:", error);
            }
        };
        if (cinemaObject == null){
            fetchCinemaObject();
        }
    },);

    const goToReservation = (city) => {
        navigate ('/reservation');
    }

    return (
        <div onClick={() => goToReservation()} className="movie-card">
            <div className="movie-info">

                {cinemaObject != null ? (
                        <MovieCard key={cinemaObject.movie_id} movie={cinemaObject} />
                ) : (
                    <p>Ładowanie...</p>
                )}


                <p><strong>Czas trwania:</strong> {screening.price} min</p>
            </div>
        </div>
    );
}

export default ScreeningCard;