import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendMoviesRequest from "../service/SendMoviesRequest.js";
import MovieCard from "../components/MovieCard.jsx";
import Header from "../components/Header.jsx";

function HomeSite() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await SendMoviesRequest();
                console.log(moviesData);
                setMovies(moviesData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

        return (
            <>
                <Header/>
                <div>
                    <h2>Filmy:</h2>
                    <div className="movies-list">
                        {movies && movies.length > 0 ? (
                            movies.map(movie => (
                                <MovieCard key={movie.movie_id} movie={movie}/>
                            ))
                        ) : (
                            <p>Ładowanie...</p>
                        )}
                    </div>
                </div>
            </>
        );
}

export default HomeSite;
