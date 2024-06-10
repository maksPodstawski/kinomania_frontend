import axios from 'axios';

const SendAddEmployeeRequest = async (employeeId, name, surname, cinemaId, positionId, userId) => {
    const refreshPage = () => {
        window.location.reload();
    };

    const url = 'http://localhost:8080/api/v1/panel/addEmployee';
    const EmployeeData = {
        cinemaId: cinemaId,
        positionId: positionId,
        userId: userId,
        name: name,
        surname: surname
    }

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    axios.post(url, EmployeeData, {headers: headers})
        .then(response => {
            console.log('Dodano pracownika:', response.data)
            alert("Dodano pracownika");
            refreshPage();
        })
        .catch(error => {
            console.error('Błąd podczas dodawania pracownika:', error);
        });
}

export default SendAddEmployeeRequest;