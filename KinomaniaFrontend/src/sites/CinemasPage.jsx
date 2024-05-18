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
            <Header/>
            <br/>
            <br/>
            <div>
                <h1>Sprawdź czy mamy kino w twoim mieście!</h1>
                <br/>
                <input
                    type="text"
                    placeholder="Wyszukaj kino po mieście"
                    value={search}
                    onChange={handleSearchChange}
                />
                <div className="cinemas-container">
                    {filteredCinemas && filteredCinemas.length > 0 ? (
                        filteredCinemas.map(cinema => (
                            <div className="cinema-card">
                                <CinemasCard key={cinema.cinema_id} cinema={cinema}/>
                            </div>
                        ))
                    ) : (
                        <p>Brak kin w podanej miejscowości - sprawdź pisownie!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default CinemasPage;