import axios from "axios";


async function SendMoviesRequest() {
    const url = 'http://localhost:8080/api/v1/movies';

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendMoviesRequest;