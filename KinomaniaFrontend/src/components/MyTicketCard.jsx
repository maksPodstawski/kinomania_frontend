import React from 'react';
import '../styles/myTicketsCard.css'

const MyTicketCard = ({ reservation }) => {
    const { movie, room, date, price } = reservation.screening;
    const { address, city } = room.cinema;
    const { seats } = reservation;

    console.log("Seats:", seats); // Sprawdzenie danych w konsoli

    return (
        <div className="myTicket-card">
            <div className="myTicket-card-image-container">
                <img src={movie.img_url} alt={movie.title} className="myTicket-card-image" />
            </div>
            <div className="myTicket-card-info">
                <h2 className="myTicket-card-title">Tytuł: {movie.title}</h2>
                <h2 className="myTicket-card-detail">Czas trwania: {movie.duration} min</h2>
                <h2 className="myTicket-card-detail">Adres kina: {address}, {city}</h2>
                <h2 className="myTicket-card-detail">Numer sali: {room.room_number}</h2>
                <h2 className="myTicket-card-detail">Miejsca:</h2>
                {seats && seats.length > 0 ? (
                    seats.map((seat, index) => (
                        <p key={index} className="myTicket-card-seat">Rząd: {seat.row}, Kolumna: {seat.column}</p>
                    ))
                ) : (
                    <p className="myTicket-card-seat">Brak informacji o miejscach</p>
                )}
                <h2 className="myTicket-card-detail">Data: {new Date(date).toLocaleString()}</h2>
            </div>
        </div>
    );
}

export default MyTicketCard;
