import React, { useState, useEffect } from 'react';
import SendCinemasRequest from '../service/SendCinemasRequest';
import SendAddRoomWithSeatsRequest from '../service/SendAddRoomWithSeatsRequest';

function AddRoomToCinemaPage() {
    const refreshPage = () => {
        window.location.reload();
    };
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [rows, setRows] = useState("");
    const [columns, setColumns] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCinemas() {
            try {
                const cinemaList = await SendCinemasRequest();
                setCinemas(cinemaList);
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        }

        fetchCinemas();
    }, []);

    const handleCinemaChange = (event) => {
        setSelectedCinema(event.target.value);
    };

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleRowsChange = (event) => {
        setRows(event.target.value);
    };

    const handleColumnsChange = (event) => {
        setColumns(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedCinema || !roomNumber || !rows || !columns) {
            setError("Wszystkie pola są wymagane.");
            return;
        }

        const seatsAndRoomDTO = {
            cinemaId: selectedCinema,
            roomNumber: roomNumber,
            rows: rows,
            columns: columns
        };

        try {
            await SendAddRoomWithSeatsRequest(seatsAndRoomDTO);
            setError(null);
            alert("Udało się dodać salę");
            refreshPage();
        } catch (error) {
            console.error("Błąd dodawania sali:", error);
            setError("Nie udało się dodać sali.");
        }
    };

    return (
        <div className="add-room-to-cinema-form">
            <h1>Dodawanie sali kinowej</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <select onChange={handleCinemaChange} value={selectedCinema}>
                <option value="">Wybierz kino</option>
                {cinemas.map(cinema => (
                    <option key={cinema.cinema_id} value={cinema.cinema_id}>
                        {cinema.city} - {cinema.address}
                    </option>
                ))}
            </select>
            <br />
            <input
                id="roomNumber"
                name="roomNumber"
                type="number"
                placeholder="Numer pokoju"
                required
                value={roomNumber}
                onChange={handleRoomNumberChange}
            />
            <br />
            <input
                id="rows"
                name="rows"
                type="number"
                placeholder="Ilość wierszy"
                required
                value={rows}
                onChange={handleRowsChange}
            />
            <br />
            <input
                id="columns"
                name="columns"
                type="number"
                placeholder="Ilość kolumn"
                required
                value={columns}
                onChange={handleColumnsChange}
            />
            <br />
            <button onClick={handleSubmit} type="submit">
                Dodawanie sali kinowej
            </button>
        </div>
    );
}

export default AddRoomToCinemaPage;
