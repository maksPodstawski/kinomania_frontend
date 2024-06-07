import Header from "../components/Header.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import {format} from 'date-fns';

const WorkerAddScreening = () =>{

    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [datetime, setDatetime] = useState(new Date());
    const [price, setPrice] = useState('');


    useEffect(() => {
        const fetchRooms = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
                try {
                    const moviesResponse = await axios.get('http://localhost:8080/api/v1/movies');
                    setMovies(moviesResponse.data);
                    const roomsResponse = await axios.get(`http://localhost:8080/api/v1/getRoomsByWorker`, {headers: headers});
                    setRooms(roomsResponse.data);
                    setSelectedRoom('');
                    setSelectedCinema(roomsResponse.data[0].cinema.cinema_id);
                    console.log(roomsResponse.data[0].cinema.cinema_id);
                } catch (error) {
                    console.error('Error fetching rooms:', error);
                }
        };
        if(rooms.length === 0) {
            fetchRooms();
        }
    }, );

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

        const formattedDatetime = format(datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS');

        const screeningData = {
            cinemaId: selectedCinema,
            movieId: selectedMovie,
            roomId: selectedRoom,
            screeningDate: formattedDatetime,
            price: parseFloat(price),
        };

        console.log(screeningData);

        try {
            await axios.post('http://localhost:8080/api/v1/worker/addScreening', screeningData, { headers });
            alert('Seans dodano poprawnie');
            window.location.reload();
        } catch (error) {
            console.error('Błąd w dodawaniu seansu:', error);
            alert('Nie udało się dodać seansu');
        }
    };
    if (localStorage.getItem('authorities') === "ROLE_WORKER") {
        return (
            <>
                <Header/>
                <div className="add-screening-form">
                    <h1>Dodaj nowy seans</h1>

                    <label>
                        <p onChange={handleCinemaChange} id="add-screening-input">
                            <option value="">Id twojego kina: {selectedCinema}</option>
                        </p>
                    </label>
                    <br/>
                    <label>
                        <select value={selectedMovie} onChange={handleMovieChange} id="add-screening-input">
                            <option value="">Wybierz film</option>
                            {movies.map(movie => (
                                <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>
                            ))}
                        </select>
                    </label>
                    <br/>

                    <label>
                        <select value={selectedRoom} onChange={handleRoomChange} id="add-screening-input">
                            <option value="">Wybierz salę</option>
                            {rooms.map(room => (
                                <option key={room.room_id} value={room.room_id}>{room.room_number}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
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
                    <br/>
                    <label>
                        <input id="add-screening-input" type="number" step="0.01" value={price}
                               onChange={handlePriceChange} placeholder="Cena"/>
                    </label>
                    <br/>
                    <button onClick={handleSubmit}>Dodaj seans</button>
                </div>
            </>
        )
    }
}

export default WorkerAddScreening;