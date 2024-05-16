import React, {useEffect, useRef, useState} from 'react';
import '../styles/SeatReservationPanel.css';
import SendSeatsRequest from "../service/SendSeatsRequest.js";
import {useParams} from "react-router-dom";
import SendScreeningByIdRequest from "../service/SendScreeningByIdRequest.js";




const Seat = ({ id, row, number, selected, onSelect }) => {
    return (
        <button
            className={`seat ${selected ? 'selected' : ''}`}
            onClick={() => onSelect(id)}
        >
            {`${row}${number}`}
        </button>
    );
};

const SeatReservationPanel = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [numRows] = useState(5);

    let {screening_id} = useParams();





    const seatsLayout = [];
    const numSeatsPerRow = 10;

    for (let row = 1; row <= numRows; row++) {
        for (let seatNumber = 1; seatNumber <= numSeatsPerRow; seatNumber++) {
            const seatId = (row - 1) * numSeatsPerRow + seatNumber;
            seatsLayout.push({ id: seatId, row: String.fromCharCode(64 + row), number: seatNumber });
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

        for (let row = 1; row <= numRows; row++) {
            let seatsInRow = [];
            for (let seatNumber = 1; seatNumber <= numSeatsPerRow; seatNumber++) {
                const seatId = (row - 1) * numSeatsPerRow + seatNumber;
                const seatData = seatsLayout.find(seat => seat.id === seatId);
                if (seatData) {
                    seatsInRow.push(
                        <Seat
                            key={seatId}
                            id={seatData.id}
                            row={seatData.row}
                            number={seatData.number}
                            selected={selectedSeats.includes(seatData.id)}
                            onSelect={toggleSeatSelection}
                        />
                    );
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



    const [screening, setScreening] = useState([]);


    useEffect(() => {

        const fetchScreening = async () => {
            try {
                const screeningData = await SendScreeningByIdRequest(screening_id);
                console.log(screeningData);
                setScreening(screeningData);

            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        if (screening != null){fetchScreening();}
    }, []);

    const [seats, setSeats] = useState([]);

    useEffect(() => {

        const fetchSeats = async (id) => {
            try {
                const seatsData = await SendSeatsRequest(id);
                console.log(seatsData);
                setSeats(seatsData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };


        const fetchScreening = async () => {
            try {
                const screeningData = await SendScreeningByIdRequest(screening_id);
                console.log(screeningData.room.room_id);
                let id = screeningData.room.room_id;
                setScreening(screeningData);
                if (seats != null){fetchSeats(id);}
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        if (screening != null){fetchScreening();}


        console.log("ASD");
        console.log(seats);
    }, []);



    return (
        <div className="seat-selection-panel">
            <h2>Wybierz miejsce w kinie</h2>
            <div className="seats-container">{renderSeats()}</div>
            <p>Wybrane miejsca: {selectedSeats.map(seatId => `(${seatsLayout.find(seat => seat.id === seatId).row}${seatsLayout.find(seat => seat.id === seatId).number})`).join(', ')}</p>
        </div>
    );
};

export default SeatReservationPanel;