import React, {useEffect, useState} from 'react';
import '../styles/cinemasStyles.css'
import SendCinemasRequest from "../service/SendCinemasRequest.js";
import Header from "../components/Header.jsx";
import CinemasCard from "../components/CinemasCard.jsx";



const CinemasPage = ({}) => {
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
        cinema.city.toLowerCase().includes(search.toLowerCase()) ||
        cinema.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="search-container">
                <h1>Sprawdź czy mamy kino w twoim mieście!</h1>
                <input
                    type="text"
                    placeholder="Wyszukaj kino po mieście"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="cinemas-container">
                {filteredCinemas && filteredCinemas.length > 0 ? (
                    filteredCinemas.map(cinema => (
                        <div key={cinema.cinema_id} className="cinema-card">
                            <CinemasCard cinema={cinema} />
                        </div>
                    ))
                ) : (
                    <p>Brak kin w podanej miejscowości - sprawdź pisownie!</p>
                )}
            </div>
        </>
    );
};

export default CinemasPage;