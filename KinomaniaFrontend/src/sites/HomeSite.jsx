import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendMoviesRequest from "../service/SendMoviesRequest.js";
import MovieCard from "../components/MovieCard.jsx";

function HomeSite() {

    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

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
        const goToLogin = () => {
            navigate('/login');
        }
        const goToRegister = () => {
            navigate('/register');
        }


        return (
            <>
                <div className="login-form">
                    <button className="loginComponent" onClick={goToLogin}>Zaloguj się</button>
                    <button className="registerComponent" onClick={goToRegister}>Zarejestruj się</button>
                </div>
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
