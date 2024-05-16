import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SendMoviesRequest from "../service/SendMoviesRequest.js";

function RemoveMoviePage() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const fetchMovies = async () => {
        try {
            const moviesData = await SendMoviesRequest();
            console.log(moviesData);
            setMovies(moviesData);
        } catch (error) {
            console.error("Error fetching movies:", error);
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

        console.log(selectedMovie);

        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,


        }

        axios.delete(url, {headers: headers})
            .then(response => {
                console.log('Film usunięty:', response.data);
                fetchMovies();
                alert("Usunięto film");
            })
            .catch(error => {
                console.error('Błąd podczas usuwania filmu:', error);
            });
    }

    return(
        <>
        <div className="remove-movie-container">
            <h2>Usuń Film</h2>
            <div className="movie-container">
                <select onChange={handleMovieChange}>
                    {movies.map(movie => (
                        <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>
                    ))}
                </select>
                <br />
                <button type="submit" onClick={handleSubmit}>Usuń</button>
            </div>
        </div>
        </>
    )
}

export default RemoveMoviePage;