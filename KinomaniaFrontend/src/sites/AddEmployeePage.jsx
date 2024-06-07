import React, {useEffect, useState} from 'react';
import SendAddCinemaRequest from "../service/SendAddCinemaRequest.jsx";
import Header from "../components/Header.jsx";
import '../styles/addCinemaStyle.css';
import SendCinemasRequest from "../service/SendCinemasRequest.js";

function AddEmployeePage() {
    const [cinemaName, setCinemaName] = useState("");
    const [cinemaAddress, setCinemaAddress] = useState("");
    const [cinemaURL, setCinemaURL] = useState("");
    const [selectedCinema, setSelectedCinema] = useState("");
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        async function fetchCinemas() {
            try {
                const cinemaList = await SendCinemasRequest();
                setCinemas(cinemaList);
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        }
        fetchCinemas();
    }, []);


    const handleCinemaCityChange = (event) => {
        setCinemaName(event.target.value);
    }

    const handleCinemaAdressChange = (event) => {
        setCinemaAddress(event.target.value);
    }

    const handleCinemaURLChange = (event) => {
        setCinemaURL(event.target.value);
    }

    console.log(cinemaName);
    console.log(cinemaAddress);
    console.log(cinemaURL);

    const handleSubmit = async () => {
        await SendAddCinemaRequest(cinemaName, cinemaAddress, cinemaURL);
    }

    const handleCinemaChange = (event) => {
        setSelectedCinema(event.target.value);
    };

    return (
        <>
            <Header/>
            <div className="add-cinema-form">
                <h1>Dodawanie nowego pracownika kina</h1>

                <select onChange={handleCinemaChange} value={selectedCinema}>
                    <option value="">Wybierz kino</option>
                    {cinemas.map(cinema => (
                        <option key={cinema.cinema_id} value={cinema.cinema_id}>
                            {cinema.city} - {cinema.address}
                        </option>
                    ))}
                </select>
                <br/>
                <input id="cinemaLocation" name="cinemaLocation" type="text"
                       placeholder="Wybierz stanowisko" required
                       onChange={handleCinemaAdressChange}/>
                <br/>
                <input id="cinemaURL" name="cinemaURL" type="text" placeholder="Wybierz użytkownika"
                       required onChange={handleCinemaURLChange}/>
                <br/>
                <input id="cinemaURL" name="cinemaURL" type="text" placeholder="Wprowadź Imię pracownika"
                       required onChange={handleCinemaURLChange}/>
                <br/>
                <input id="cinemaURL" name="cinemaURL" type="text" placeholder="Wprowadź Nazwisko pracownika"
                       required onChange={handleCinemaURLChange}/>
                <br/>
                <button onClick={handleSubmit} type="submit">Dodaj pracownika</button>
            </div>
        </>);
}

export default AddEmployeePage;