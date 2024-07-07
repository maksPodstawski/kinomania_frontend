import React from 'react';
import '../styles/movieCardStyle.css'

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.img_url} alt={movie.title} />
            <div className="movie-info">
                <h2>{movie.title}</h2>
                <p className="movie-card-text"><strong>Reżyser:</strong> {movie.director}</p>
                <p className="movie-card-text" ><strong>Gatunek:</strong> {movie.genre}</p>
                <p className="movie-description"><strong>Opis: </strong>{movie.description}</p>
                <p className="movie-card-text" ><strong>Czas trwania:</strong> {movie.duration} min</p>
            </div>
        </div>
    );
}

export default MovieCard;