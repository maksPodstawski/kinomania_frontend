import React, {useState} from 'react';
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

    console.log(cinemaName);
    console.log(cinemaAddress);
    console.log(cinemaURL);

    const handleSubmit = async () => {
        await SendAddCinemaRequest(cinemaName, cinemaAddress, cinemaURL);
    }

    return (
        <>
            <Header/>
            <div className="add-cinema-form">
                <h1>Dodawanie nowej lokalizacji kin do sieci kin</h1>
                <input id="cinemaName" name="cinemaName" type="text" placeholder="Wpisz miasto"
                       required onChange={handleCinemaCityChange}/>
                <br/>
                <input id="cinemaLocation" name="cinemaLocation" type="text"
                       placeholder="Wpisz adres" required
                       onChange={handleCinemaAdressChange}/>
                <br/>
                <input id="cinemaURL" name="cinemaURL" type="text" placeholder="Wpisz URL obrazu kina"
                       required onChange={handleCinemaURLChange}/>
                <br/>
                <button onClick={handleSubmit} type="submit">Dodaj kino</button>
            </div>
        </>);
}

export default AddCinemaPage;