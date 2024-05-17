import axios from 'axios';


const SendRemoveCinemaRequest = async (cinemaCity, cinemaAddress) => {
    const refreshPage = () => {
        window.location.reload();
    };
    const url = 'http://localhost:8080/api/v1/panel/removeCinema/${selectedCinema}';
    const CinemaData = {
        city: cinemaCity,
        address: cinemaAddress
    }

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }



    axios.post(url, CinemaData, {headers: headers})
        .then(response => {
            console.log('Usunieto kino:', response.data)
            alert("Usuniętno kino");
            refreshPage();
        })
        .catch(error => {
            console.error('Błąd podczas usuwania kina:', error);
        });
}
export default SendRemoveCinemaRequest;