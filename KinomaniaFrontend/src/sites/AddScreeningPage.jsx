import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Header from "../components/Header.jsx";
import '../styles/addScreeningStyle.css';

function AddScreeningPage() {
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [datetime, setDatetime] = useState(new Date());
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);

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
                    setSelectedRoom('');
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
        if(!selectedMovie) {
            setError("Proszę wybrać film.");
            return;
        }
        if (!selectedCinema) {
            setError("Proszę wybrać kino.");
            return;
        }
        if (!selectedRoom) {
            setError("Proszę wybrać salę.");
            return;
        }
        if (!price || price <= 0) {
            setError("Proszę wpisać poprawną cene.");
            return;
        }



        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const formattedDatetime = format(datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS');

        const screeningData = {
            cinemaId: selectedCinema,
            movieId: selectedMovie,
            roomId: selectedRoom,
            screeningDate: formattedDatetime,
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
        <>
            <Header />
        <div className="add-screening-form">
            <h1>Dodaj nowy seans</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                <select value={selectedMovie} onChange={handleMovieChange} id="add-screening-input">
                    <option value="">Wybierz film</option>
                    {movies.map(movie => (
                        <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                <select value={selectedCinema} onChange={handleCinemaChange} id="add-screening-input">
                    <option value="">Wybierz kino</option>
                    {cinemas.map(cinema => (
                        <option key={cinema.cinema_id} value={cinema.cinema_id}>{cinema.city} - {cinema.address}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                <select value={selectedRoom} onChange={handleRoomChange} id="add-screening-input">
                    <option value="">Wybierz salę</option>
                    {rooms.map(room => (
                        <option key={room.room_id} value={room.room_id}>{room.room_number}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                <DatePicker
                    id="add-screening-input"
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
                <input id="add-screening-input" type="number" step="0.01" value={price} onChange={handlePriceChange} placeholder="Cena"/>
            </label>
            <br />
            <button onClick={handleSubmit}>Dodaj seans</button>
        </div>
        </>);
}

export default AddScreeningPage;
