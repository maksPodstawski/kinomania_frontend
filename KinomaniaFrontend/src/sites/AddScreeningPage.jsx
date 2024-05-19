import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddScreeningPage() {
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchMoviesAndCinemas = async () => {
            try {
                const moviesResponse = await axios.get('http://localhost:8080/api/v1/movies');
                const cinemasResponse = await axios.get('http://localhost:8080/api/v1/getCinemas');
                setMovies(moviesResponse.data);
                setCinemas(cinemasResponse.data);
            } catch (error) {
                console.error('Error fetching movies and cinemas:', error);
            }
        };
        fetchMoviesAndCinemas();
    }, []);

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    };

    const handleCinemaChange = (event) => {
        setSelectedCinema(event.target.value);
    };

    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const screeningData = {
            cinemaId: selectedCinema,
            movieId: selectedMovie,
            roomId: selectedRoom,
            screeningDate: date,
            screeningTime: time,
            price: parseFloat(price),
        };

        try {
            await axios.post('http://localhost:8080/api/v1/panel/addScreening', screeningData, { headers });
            alert('Seans dodano poprawnie');
            window.location.reload();
        } catch (error) {
            console.error('Błąd w dodawaniu seansu:', error);
            alert('Nie udało się dodać seansu');
        }
    };

    return (
        <div className="add-screening-form">
            <h1>Dodaj nowy seans</h1>
            <label>
                Film:
                <select value={selectedMovie} onChange={handleMovieChange}>
                    <option value="">Wybierz film</option>
                    {movies.map(movie => (
                        <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Kino:
                <select value={selectedCinema} onChange={handleCinemaChange}>
                    <option value="">Wybierz kino</option>
                    {cinemas.map(cinema => (
                        <option key={cinema.cinema_id} value={cinema.cinema_id}>{cinema.city} - {cinema.address}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Sala kinowa:
                <input type="text" value={selectedRoom} onChange={handleRoomChange} placeholder="Podaj ID sali" />
            </label>
            <br />
            <label>
                Data występowania:
                <input type="date" value={date} onChange={handleDateChange} />
            </label>
            <br />
            <label>
                Czas trwania:
                <input type="time" value={time} onChange={handleTimeChange} />
            </label>
            <br />
            <label>
                Cena:
                <input type="number" step="0.01" value={price} onChange={handlePriceChange} />
            </label>
            <br />
            <button onClick={handleSubmit}>Dodaj seans</button>
        </div>
    );
}

export default AddScreeningPage;
