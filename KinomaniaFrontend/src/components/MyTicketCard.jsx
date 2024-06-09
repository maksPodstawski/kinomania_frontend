import React from 'react';

const MyTicketCard = ({ reservation }) => {
    const { movie, room, date, price } = reservation.screening;
    const { address, city } = room.cinema;
    const { seats } = reservation;

    console.log("Seats:", seats); // Sprawdzenie danych w konsoli

    return (
        <div className="movie-card">
            <img src={movie.img_url} alt={movie.title} />
            <div className="movie-info">
                <h2>Tytuł: {movie.title}</h2>
                <h2>Czas trwania: {movie.duration} min</h2>
                <h2>Adres kina: {address}, {city}</h2>
                <h2>Numer sali: {room.room_number}</h2>
                <h2>Miejsca:</h2>
                {seats && seats.length > 0 ? (
                    seats.map((seat, index) => (
                        <p key={index}>Rząd: {seat.row}, Kolumna: {seat.column}</p>
                    ))
                ) : (
                    <p>Brak informacji o miejscach</p>
                )}
                <h2>Data: {new Date(date).toLocaleString()}</h2>
            </div>
        </div>
    );
}

export default MyTicketCard;
