import React, {useEffect, useState} from 'react';
import '../styles/SeatReservationPanel.css';
import SendSeatsRequest from "../service/SendSeatsRequest.js";
import {useNavigate, useParams} from "react-router-dom";
import SendScreeningByIdRequest from "../service/SendScreeningByIdRequest.js";
import SendSeatReservationRequest from "../service/SendSeatReservationRequest.jsx";
import SendMoviesRequest from "../service/SendMoviesRequest.js";
import SendReservatedSeatsRequest from "../service/SendReservatedSeatsRequest.js";
import PaymentPage from "./PaymentPage.jsx";
import Header from "../components/Header.jsx";

const Seat = ({id, row, number, selected, onSelect, disabled}) => {
    return (
        <button
            className={`seat ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onSelect(id)}
            disabled={disabled}
        >
            {`${row}${number}`}
        </button>
    );
};


const SeatReservationPage = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [numRows] = useState();

    let {screening_id} = useParams();

    const [screening, setScreening] = useState([]);

    const [seats, setSeats] = useState([]);
    const [numSeatsPerColumn, setNumSeatsPerColumn] = useState([]);
    const [numSeatsPerRow, setNumSeatsPerRow] = useState([]);
    const [reservatedSeats, setReservatedSeats] = useState([]);

    useEffect(() => {

        const fetchSeats = async (id) => {
            try {
                const seatsData = await SendSeatsRequest(id);
                setSeats(seatsData);
                let a = seatsData;
                let b = a[seatsData.length - 1].seat_row;
                let c = seatsData;
                let d = c[seatsData.length - 1].seat_column;
                setNumSeatsPerRow(b);
                setNumSeatsPerColumn(d);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        const fetchScreening = async () => {
            try {
                const screeningData = await SendScreeningByIdRequest(screening_id);
                let id = screeningData.room.room_id;
                setScreening(screeningData);
                if (seats != null) {
                    fetchSeats(id);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        if (screening != null) {
            fetchScreening();
        }

        const fetchReservatedSeats = async () => {
            try {
                const reservatedSeatsData = await SendReservatedSeatsRequest(screening_id);
                let a = reservatedSeatsData;
                setReservatedSeats(a);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        if (screening_id != null) {
            fetchReservatedSeats();
        }

    }, []);

    const seatsLayout = [];

    for (let row = 1; row <= numSeatsPerRow; row++) {
        for (let seatNumber = 1; seatNumber <= numSeatsPerColumn; seatNumber++) {
            const seatId = (row - 1) * numSeatsPerRow + seatNumber;
            seatsLayout.push({
                id: seatId + seats[0].seat_id - 1,
                row: String.fromCharCode(64 + row),
                number: seatNumber
            });
        }
    }

    const toggleSeatSelection = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const renderSeats = () => {
        let rows = [];


        for (let row = 1; row <= numSeatsPerRow; row++) {
            let seatsInRow = [];
            for (let seatNumber = 1; seatNumber <= numSeatsPerColumn; seatNumber++) {
                const seat = seats.find(seat => seat.seat_row === row && seat.seat_column === seatNumber);
                // console.log("TO PIERWSZE"+seat.seat_id);
                //console.log("TO Drugie"+reservatedSeats.seat_id);

                let tabReservedSeats = [];
                for (let i = 0; i < reservatedSeats.length; i++) {
                    tabReservedSeats.push(reservatedSeats[i].seat_id);
                }

                //console.log(tabReservedSeats[0].seat_id);

                if (tabReservedSeats.includes(seat.seat_id)) {
                    if (seat) {
                        seatsInRow.push(
                            <Seat
                                key={seat.seat_id}
                                id={seat.seat_id}
                                row={String.fromCharCode(64 + row)}
                                number={seatNumber}
                                selected={selectedSeats.includes(seat.seat_id)}
                                onSelect={false}
                                disabled={true}
                            />
                        );
                    }
                } else {
                    if (seat) {
                        seatsInRow.push(
                            <Seat
                                key={seat.seat_id}
                                id={seat.seat_id}
                                row={String.fromCharCode(64 + row)}
                                number={seatNumber}
                                selected={selectedSeats.includes(seat.seat_id)}
                                onSelect={toggleSeatSelection}
                            />
                        );
                    }
                }
            }
            rows.push(
                <div key={`row-${row}`} className="seat-row">
                    <h3>Rząd {String.fromCharCode(64 + row)}</h3>
                    <div className="seat-grid">{seatsInRow}</div>
                </div>
            );
        }

        return rows;
    };
    const refreshPage = () => {
        window.location.reload();
    };
    const navigate = useNavigate();


    const handleSubmit = () => {
        if (localStorage.getItem('token') != null) {
            navigate(`/payment`, {
                state: {
                    screeningID: screening.screening_id,
                    seats: selectedSeats
                }
            });
        }
        else{
            navigate(`/details`, {
                state: {
                    screeningID: screening.screening_id,
                    seats: selectedSeats
                }
            });
        }
    }

    return (
        <>
            <Header/>
            <div className="seat-selection-panel">
                <h2>Wybierz miejsce w kinie</h2>
                <div className="seats-container">{renderSeats()}</div>
                <p>Wybrane miejsca: {selectedSeats.map(seatId => {
                    const seat = seats.find(seat => seat.seat_id === seatId);
                    return seat ? `(${String.fromCharCode(64 + seat.seat_row)}${seat.seat_column})` : '';
                }).join(', ')}</p>
                <button onClick={handleSubmit}>Zarezerwuj miejsca!</button>
            </div>
        </>);
};


export default SeatReservationPage;