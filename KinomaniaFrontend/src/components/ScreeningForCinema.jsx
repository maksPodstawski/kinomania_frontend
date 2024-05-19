import React, { useEffect, useState } from 'react';
import '../styles/cinemasStyles.css';
import Header from "./Header.jsx";
import { useParams } from 'react-router-dom';
import SendScreeningsRequest from "../service/SendScreeningsRequest.js";
import ScreeningCard from "./ScreeningCard.jsx";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ScreeningForCinema = ({ cinema }) => {
    const { city } = useParams();

    const [screenings, setScreenings] = useState([]);
    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const screeeningsData = await SendScreeningsRequest(city);
                console.log(screeeningsData);
                setScreenings(screeeningsData);
            } catch (error) {
                console.error("Error fetching screeenings:", error);
            }
        };

        fetchScreenings();

    }, [city]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    const [renderedMoviesMap, setRenderedMoviesMap] = useState(new Map());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (selectedDate) {
            const filtered = screenings.filter(screening => {
                const screeningDate = new Date(screening.date);
                return (
                    screeningDate.getFullYear() === date.getFullYear() &&
                    screeningDate.getMonth() === date.getMonth() &&
                    screeningDate.getDate() === date.getDate()
                );
            });
            setFilteredScreenings(filtered);
        } else {
            setFilteredScreenings([]);
        }
    };

    useEffect(() => {
        const map = new Map();
        filteredScreenings.forEach(screening => {
            const movieId = screening.movie.movie_id;
            if (map.has(movieId)) {
                const existing = map.get(movieId);
                existing.additionalDates.push({
                    screening_id: screening.screening_id,
                    date: screening.date
                });
            } else {
                map.set(movieId, {
                    screening: screening,
                    additionalDates: []
                });
            }
        });
        setRenderedMoviesMap(map);


    }, [filteredScreenings]);

    useEffect(() => {
        if (screenings != null) {
            handleDateChange(selectedDate);
        }
    }, [selectedDate, screenings]);

    return (
        <>
            <Header />
            <div>
                <div>
                    <h1>Wybierz datę</h1>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        isClearable
                        placeholderText="Wybierz datę"
                    />
                    {selectedDate && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Wybrana data:</h2>
                            <p>{selectedDate.toLocaleDateString()}</p>
                        </div>
                    )}
                </div>

                <div>
                    <h1>Screenings dla miasta: {city}</h1>
                    <div className="screenings-container">
                        {filteredScreenings && filteredScreenings.length > 0 ? (
                            Array.from(renderedMoviesMap.values()).map((item, index) => (
                                <div key={index} className="screening-item">
                                    <ScreeningCard
                                        screening={item.screening}
                                        additionalDates={item.additionalDates}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Ładowanie...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScreeningForCinema;
