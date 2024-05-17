import React, {useEffect, useState} from 'react';
import '../styles/SeatReservationPanel.css';
import SendSeatsRequest from "../service/SendSeatsRequest.js";
import {useParams} from "react-router-dom";
import SendScreeningByIdRequest from "../service/SendScreeningByIdRequest.js";
import SendSeatReservationRequest from "../service/SendSeatReservationRequest.jsx";




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

const SeatReservationPage = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [numRows] = useState();

    let {screening_id} = useParams();

    const [screening, setScreening] = useState([]);

    const [seats, setSeats] = useState([]);
    const [numSeatsPerColumn, setNumSeatsPerColumn] = useState([]);
    const [numSeatsPerRow, setNumSeatsPerRow] = useState([]);

    useEffect(() => {

        const fetchSeats = async (id) => {
            try {
                const seatsData = await SendSeatsRequest(id);
                console.log(seatsData);
                setSeats(seatsData);
                let a = seatsData;
                let b = a[seatsData.length-1].seat_row;
                let c = seatsData;
                let d = c[seatsData.length-1].seat_column;
                setNumSeatsPerRow(b);
                setNumSeatsPerColumn(d);

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


    const seatsLayout = [];
   // const numSeatsPerRow = 10;

    for (let row = 1; row <= numSeatsPerRow; row++) {
        for (let seatNumber = 1; seatNumber <= numSeatsPerColumn; seatNumber++) {
            const seatId = (row - 1) * numSeatsPerRow + seatNumber + seats[0].seat_id;
            seatsLayout.push({ id: seatId, row: String.fromCharCode(64 + row), number: seatNumber });
        }
    }
    //todo naprawić wyświetlanie numerków
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
                const seatId = (row - 1) * numSeatsPerRow + seatNumber + seats[0].seat_id;
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


    const handleSubmit = async () => {
            SendSeatReservationRequest(screening.screening_id,selectedSeats);
            console.log(selectedSeats);  //todo lepiej przesyłać zaznaczone siedzonka bo nie moża zarezerwować więcej niż 1
            alert("Zarezerwowano miejsca!");
        }

    return (
        <div className="seat-selection-panel">
            <h2>Wybierz miejsce w kinie</h2>
            <div className="seats-container">{renderSeats()}</div>
            <p>Wybrane miejsca: {selectedSeats.map(seatId => `(${seatsLayout.find(seat => seat.id === seatId).row}${seatsLayout.find(seat => seat.id === seatId).number})`).join(', ')}</p>
            <button onClick={handleSubmit}>Zarezerwuj miejsca!</button>
        </div>
    );
    };

    export default SeatReservationPage;