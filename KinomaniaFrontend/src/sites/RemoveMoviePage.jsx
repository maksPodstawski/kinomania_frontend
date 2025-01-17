import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SendMoviesRequest from "../service/SendMoviesRequest.js";
import Header from "../components/Header.jsx";
import '../styles/removeMovieStyle.css';
import {BrowserRouter} from "react-router-dom";

function RemoveMoviePage() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const fetchMovies = async () => {
        try {
            const moviesData = await SendMoviesRequest();
            setMovies(moviesData);
            setSelectedMovie(moviesData[0].movie_id);
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    }


    const handleSubmit = async () => {
        const url = `http://localhost:8080/api/v1/panel/removeMovie/${selectedMovie}`;

        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
        }

        axios.put(url, {}, { headers: headers })
            .then(response => {
                fetchMovies();
                alert("Usunięto film");
            })
            .catch(error => {
                throw error;
            });
    }

    return(
        <>
            <Header/>
        <div className="remove-movie-container">
            <h1>Usuń Film</h1>
            <div className="movie-container">
                <select onChange={handleMovieChange}>
                    {movies.map(movie => (
                        <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit" onClick={handleSubmit}>Usuń</button>
            </div>
        </div>
        </>
    )
}

export default RemoveMoviePage;