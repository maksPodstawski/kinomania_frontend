import React, {useEffect, useState} from 'react';
import '../styles/cinemasStyles.css'
import SendCinemasRequest from "../service/SendCinemasRequest.js";
import Header from "./Header.jsx";
import MovieCard from "./MovieCard.jsx";
import CinemasCard from "./CinemasCard.jsx";

const Cinemas = ({ cinema }) => {
    const [cinemas, setCinemas] = useState([]);
    const [search, setSearch] = useState('');

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

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredCinemas = cinemas.filter(cinema =>
        cinema.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Header/>
            <br/>
            <br/>
            <div>
                <h1>Sprawdź czy mamy kino w twojej lokalizacji!</h1>
                <br/>
                <input
                    type="text"
                    placeholder="Wyszukaj kino po mieście"
                    value={search}
                    onChange={handleSearchChange}
                />
                <div className="cinemas-container">
                    {filteredCinemas.map(cinema => (
                        <div className="cinema-card">
                            <CinemasCard key={cinema.cinema_id} cinema={cinema}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Cinemas;