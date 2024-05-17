// sites/AddRoomToCinemaPage.jsx

import React, { useState, useEffect } from 'react';
import SendCinemasRequest from '../service/SendCinemasRequest';
import SendAddRoomRequest from '../service/SendAddRoomRequest';

function AddRoomToCinemaPage() {
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [numberOfSeats, setNumberOfSeats] = useState("");
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

    const handleNumberOfSeatsChange = (event) => {
        setNumberOfSeats(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedCinema || !roomNumber || !numberOfSeats) {
            setError("Wszystkie pola są wymagane.");
            return;
        }

        const roomDto = {
            cinemaId: selectedCinema,
            roomNumber: roomNumber,
            numberOfSeats: numberOfSeats
        };

        try {
            await SendAddRoomRequest(roomDto);
            setError(null);
            alert("Pokój dodany");
        } catch (error) {
            console.error("Błąd w dodawaniu pokoju:", error);
            setError("Nie udało się dodać pokoju. Spróbuj ponownie.");
        }
    };

    return (
        <div className="add-room-to-cinema-form">
            <h1>Dodaj salę kinową</h1>
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
                placeholder="Numer sali"
                required
                value={roomNumber}
                onChange={handleRoomNumberChange}
            />
            <br />
            <input
                id="numberOfSeats"
                name="numberOfSeats"
                type="number"
                placeholder="Ilość miejsc siedziących"
                required
                value={numberOfSeats}
                onChange={handleNumberOfSeatsChange}
            />
            <br />
            <button onClick={handleSubmit} type="submit">
                Dodaj salę
            </button>
        </div>
    );
}

export default AddRoomToCinemaPage;
