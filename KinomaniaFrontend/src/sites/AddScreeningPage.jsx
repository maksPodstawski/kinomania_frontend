import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

function AddScreeningPage() {
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [datetime, setDatetime] = useState(new Date());
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

    useEffect(() => {
        const fetchRooms = async () => {
            if (selectedCinema) {
                try {
                    const roomsResponse = await axios.get(`http://localhost:8080/api/v1/getRooms/${selectedCinema}`);
                    setRooms(roomsResponse.data);
                    setSelectedRoom('');  // Reset selected room when cinema changes
                } catch (error) {
                    console.error('Error fetching rooms:', error);
                }
            } else {
                setRooms([]);
            }
        };
        fetchRooms();
    }, [selectedCinema]);

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    };

    const handleCinemaChange = (event) => {
        setSelectedCinema(event.target.value);
    };

    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Correctly format the datetime value
        const formattedDatetime = format(datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS');

        const screeningData = {
            cinemaId: selectedCinema,
            movieId: selectedMovie,
            roomId: selectedRoom,
            screeningDate: formattedDatetime,  // Formatted datetime
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
                <select value={selectedRoom} onChange={handleRoomChange}>
                    <option value="">Wybierz salę</option>
                    {rooms.map(room => (
                        <option key={room.room_id} value={room.room_id}>{room.room_number}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Data i czas seansu:
                <DatePicker
                    selected={datetime}
                    onChange={(date) => setDatetime(date)}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                />
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
