import React, {useEffect, useState} from 'react';
import '../styles/cinemasStyles.css'
import Header from "./Header.jsx";
import { useParams } from 'react-router-dom';
import MovieCard from "./MovieCard.jsx";
import SendScreeningsRequest from "../service/SendScreeningsRequest.js";

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



    return (
        <>
            <Header/>
            <div>
                <div>
                    <h1>Screenings dla miasta: {city}</h1>
                    {screenings && screenings.length > 0 ? (
                        screenings.map(screening => (
                            <MovieCard key={screening.screening_id} screening={screening}/>
                        ))
                    ) : (
                        <p>Ładowanie...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ScreeningForCinema;