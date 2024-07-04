import axios from 'axios';


const baseURL = 'http://localhost:8080';

const token = localStorage.getItem('token');

const headers = {
    Authorization: `Bearer ${token}`,
}

export default async function SendTicketsPerCinemaRequest(timeSpan){
    const url = baseURL + '/api/v1/report/ticketsPerCinema';
    return  axios.post(url,timeSpan,{headers: headers})
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error;
        });
}
export async function SendTicketsPerMovieRequest(timeSpan){
    const url = baseURL + '/api/v1/report/ticketsPerMovie';
    return  axios.post(url,timeSpan,{headers: headers})
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error;
        });
}

export async function SendIncomePerCinemaRequest(timeSpan) {
    const url = baseURL + '/api/v1/report/incomePerCinema';
    return axios.post(url, timeSpan, {headers: headers})
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error;
        });
}

export async function SendUsersTicketsAmountRequest(timeSpan) {
    const url = baseURL + '/api/v1/report/usersTicketsAmount';
    return axios.post(url, timeSpan, {headers: headers})
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error;
        });
}


export async function DownloadReport(timeSpan){
    const downloadUrl = baseURL + '/api/v1/downloadReport';
    try {
        const response = await axios.post(downloadUrl, timeSpan, {
            responseType: 'arraybuffer',
            headers: headers
        });

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.xlsx';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    } catch (error) {
        throw error;
    }
}


