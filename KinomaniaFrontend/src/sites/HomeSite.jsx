import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendMoviesRequest from "../service/SendMoviesRequest.js";
import MovieCard from "../components/MovieCard.jsx";
import Header from "../components/Header.jsx";

function HomeSite() {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');


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

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Header/>
            <br />
            <br />
            <div>
                <h1>Wszystkie filmy dostępne w sieci naszych kin!</h1>
                <input
                    type="text"
                    placeholder="Wyszukaj film po nazwie"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="movies-list">
                    {filteredMovies && filteredMovies.length > 0 ? (
                        filteredMovies.map(movie => (
                            <MovieCard key={movie.movie_id} movie={movie}/>
                        ))
                    ) : (
                        <p>Brak filmów o podanej nazwie :(</p>
                    )}
                </div>
            </div>
        </>
    );
}
export default HomeSite;
