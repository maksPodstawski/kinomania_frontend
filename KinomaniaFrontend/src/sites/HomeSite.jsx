import React, {useEffect, useState} from 'react';
import SendMoviesRequest from "../service/SendMoviesRequest.js";
import MovieCard from "../components/MovieCard.jsx";
import Header from "../components/Header.jsx";
import '../styles/homeSite.css'

function HomeSite() {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await SendMoviesRequest();
                setMovies(moviesData);
            } catch (error) {
                throw error;
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="HomeSite">
            <Header className="header"/>
            <div className="home-page-body">
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
                            <MovieCard key={movie.movie_id} movie={movie} className="movie-card"/>
                        ))
                    ) : (
                        <p className="no-movies-message">Brak filmów o podanej nazwie :(</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default HomeSite;
