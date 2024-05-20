import React from 'react';
import '../styles/movieCardStyle.css'

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.img_url} alt={movie.title} />
            <div className="movie-info">
                <h2>{movie.title}</h2>
                <p><strong>Reżyser:</strong> {movie.director}</p>
                <p><strong>Gatunek:</strong> {movie.genre}</p>
                <p className="movie-description"><strong>Opis: </strong>{movie.description}</p>
                <p><strong>Czas trwania:</strong> {movie.duration} min</p>
            </div>
        </div>
    );
}

export default MovieCard;