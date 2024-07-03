import React, { useState } from 'react';
import SendAddCinemaRequest from "../service/SendAddCinemaRequest.jsx";
import Header from "../components/Header.jsx";
import '../styles/addCinemaStyle.css';

function AddCinemaPage() {
    const [cinemaName, setCinemaName] = useState("");
    const [cinemaAddress, setCinemaAddress] = useState("");
    const [cinemaURL, setCinemaURL] = useState("");

    const handleCinemaCityChange = (event) => {
        setCinemaName(event.target.value);
    }

    const handleCinemaAdressChange = (event) => {
        setCinemaAddress(event.target.value);
    }

    const handleCinemaURLChange = (event) => {
        setCinemaURL(event.target.value);
    }

    const handleSubmit = async () => {
        if (cinemaName.trim() === "") {
            alert("Proszę wpisać miasto.");
            return;
        }
        if (cinemaAddress.trim() === "") {
            alert("Proszę wpisać adres.");
            return;
        }
        if (cinemaURL.trim() === "") {
            alert("Proszę wpisać URL obrazu kina.");
            return;
        }

        try {
            await SendAddCinemaRequest(cinemaName, cinemaAddress, cinemaURL);
        } catch (error) {
            alert("Wystąpił błąd podczas dodawania kina. Spróbuj ponownie później.");
        }
    }

    return (
        <>
            <Header/>
            <div className="add-cinema-form">
                <h1>Dodawanie nowej lokalizacji kin do sieci kin</h1>
                <input
                    id="cinemaName"
                    name="cinemaName"
                    type="text"
                    placeholder="Wpisz miasto"
                    required
                    onChange={handleCinemaCityChange}
                    value={cinemaName}
                />
                <br/>
                <input
                    id="cinemaLocation"
                    name="cinemaLocation"
                    type="text"
                    placeholder="Wpisz adres"
                    required
                    onChange={handleCinemaAdressChange}
                    value={cinemaAddress}
                />
                <br/>
                <input
                    id="cinemaURL"
                    name="cinemaURL"
                    type="text"
                    placeholder="Wpisz URL obrazu kina"
                    required
                    onChange={handleCinemaURLChange}
                    value={cinemaURL}
                />
                <br/>
                <button onClick={handleSubmit} type="submit">Dodaj kino</button>
            </div>
        </>
    );
}

export default AddCinemaPage;
