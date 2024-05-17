import React, {useState} from 'react';
import SendAddCinemaRequest from "../service/SendAddCinemaRequest.jsx";

function AddCinemaPage() {
    const [cinemaName, setCinemaName] = useState("");
    const [cinemaAddress, setCinemaAddress] = useState("");

    const handleCinemaCityChange = (event) => {
        setCinemaName(event.target.value);
    }

    const handleCinemaAdressChange = (event) => {
        setCinemaAddress(event.target.value);
    }
    console.log(cinemaName);
    console.log(cinemaAddress);

    const handleSubmit = async () => {
        await SendAddCinemaRequest(cinemaName, cinemaAddress);
    }

    return (
        <div className="add-cinema-form">
            <h1>Dodawanie nowej lokalizacji kin do sieci kin</h1>
            <input id="cinemaName" name="cinemaName" type="text" placeholder="Wpisz miasto"
                   required onChange={handleCinemaCityChange}/>
            <br/>
            <br/>
            <input id="cinemaLocation" name="cinemaLocation" type="text"
                   placeholder="Wpisz adres" required
                   onChange={handleCinemaAdressChange}/>
            <br/>
            <br/>
            <button onClick={handleSubmit} type="submit">Dodaj kino</button>
        </div>
    );
}

export default AddCinemaPage;