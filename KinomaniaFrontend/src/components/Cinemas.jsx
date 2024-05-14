import React, {useEffect, useState} from 'react';
import '../styles/cinemasStyles.css'
import SendCinemasRequest from "../service/SendCinemasRequest.js";
import Header from "./Header.jsx";

const Cinemas = ({ cinema }) => {
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const cinemasData = await SendCinemasRequest();
                console.log(cinemasData);
                setCinemas(cinemasData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchCinemas();
    }, []);


    return (
        <>
        <Header/>
        <div>
            {cinemas.map(cinema => (
                <p>{cinema.city}</p>
            ))}
        </div>
        </>
    );
}

export default Cinemas;