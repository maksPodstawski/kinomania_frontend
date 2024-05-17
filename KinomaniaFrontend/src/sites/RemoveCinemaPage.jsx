import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SendCinemasRequest from "../service/SendCinemasRequest.js";

function RemoveCinemaPage() {

    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState('');
    const fetchCinemas = async () => {
        try {
            const cinemasData = await SendCinemasRequest();
            setCinemas(cinemasData);
            setSelectedCinema(cinemasData[0].cinema_id);
        } catch (error) {
            console.error("Error fetching cinemas:", error);
        }
    };
    useEffect(() => {
        fetchCinemas();
    }, []);

    const handleCinemaChange = (event) => {
        setSelectedCinema(event.target.value);
    }

    const handleSubmit = async () => {
        const url = `http://localhost:8080/api/v1/panel/removeCinema/${selectedCinema}`;

        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
        }

        axios.delete(url, {headers: headers})
            .then(response => {
                console.log('Usunięto kino:', response.data);
                fetchCinemas();
                alert("Usunięto kino");
            })
            .catch(error => {
                console.error('Błąd podczas usuwania kina:', error);
            });
    }

    return(
        <>
            <div className="remove-cinema-container">
                <h1>Usuń Kino z listy kin</h1>
                <div className="cinema-container">
                    <select onChange={handleCinemaChange}>
                        {cinemas.map(cinema => (
                            <option key={cinema.cinema_id} value={cinema.cinema_id}>{cinema.city}</option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <button type="submit" onClick={handleSubmit}>Usuń</button>
                </div>
            </div>
        </>
    )
}

export default RemoveCinemaPage;