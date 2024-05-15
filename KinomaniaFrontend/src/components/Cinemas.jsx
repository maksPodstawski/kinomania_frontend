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
            <div>
                <input
                    type="text"
                    placeholder="Wyszukaj kino"
                    value={search}
                    onChange={handleSearchChange}
                />
                {filteredCinemas.map(cinema => (
                    // <p>{cinema.city}</p>
                    <CinemasCard key={cinema.cinema_id} cinema={cinema}/>
                ))}
            </div>
        </>
    );
}

export default Cinemas;