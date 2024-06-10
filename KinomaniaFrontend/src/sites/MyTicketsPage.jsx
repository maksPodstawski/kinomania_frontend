import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import SendCinemasRequest from "../service/SendCinemasRequest.js";
import SendReservationsForUserRequest from "../service/SendReservationsForUserRequest.jsx";
import CinemasCard from "../components/CinemasCard.jsx";
import MyTicketCard from "../components/MyTicketCard.jsx";
import MovieCard from "../components/MovieCard.jsx";


const MyTicketsPage = () => {

    const [reservationsForUser, setReservationsForUser] = useState([]);

    useEffect(() => {
        const fetchReservationsForUser = async () => {
            try {
                const reservationsForUserData = await SendReservationsForUserRequest();
                console.log(reservationsForUserData);
                setReservationsForUser(reservationsForUserData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchReservationsForUser();
    }, []);




    return  (

        <>
        <Header />
        <div >
            <br />
            <br />
            <br />
            <br />
            <br />
           <h1>Twoje bilety:</h1>
            {/*{Array.isArray(reservationsForUser) && reservationsForUser.map((reservation, index) => (*/}
            {/*    <h2 key={index}>{reservation.reservationId}</h2>*/}

            {/*))}*/}
            <div className="myTicket-card-container">
            {reservationsForUser && reservationsForUser.length > 0 ? (
                reservationsForUser.map((reservation, index) => (
                    <MyTicketCard key={index} reservation={reservation} className="ticket-card" />
                ))
            ) : (
                <p className="no-reservations-message">Brak rezerwacji :(</p>
            )}
            </div>
        </div>
        </>);
}

export default MyTicketsPage;
