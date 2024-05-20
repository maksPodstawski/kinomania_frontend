import axios from 'axios';


const SendAddCinemaRequest = async (cinemaCity, cinemaAddress, cinemaURL) => {
    const refreshPage = () => {
        window.location.reload();
    };
const url = 'http://localhost:8080/api/v1/panel/addCinema';
const CinemaData = {
    city: cinemaCity,
    address: cinemaAddress,
    image_url: cinemaURL
}

const token = localStorage.getItem('token');

const headers = {
    Authorization: `Bearer ${token}`,
}



axios.post(url, CinemaData, {headers: headers})
    .then(response => {
        console.log('Dodano kino:', response.data)
        alert("Dodano kino");
        refreshPage();
    })
    .catch(error => {
        console.error('Błąd podczas dodawania kina:', error);
    });
}
export default SendAddCinemaRequest;