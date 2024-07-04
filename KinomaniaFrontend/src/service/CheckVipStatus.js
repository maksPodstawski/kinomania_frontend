import axios from "axios";

const baseURL = 'http://localhost:8080';

const token = localStorage.getItem('token');

const headers = {
    Authorization: `Bearer ${token}`,
}

const CheckVipStatus = () => {
    const url = baseURL + '/api/v1/checkVip';
    return  axios.get(url,{headers: headers})
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error;
        });
}

export default CheckVipStatus;