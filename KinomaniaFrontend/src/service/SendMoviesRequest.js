import axios from "axios";


async function SendMoviesRequest() {
    const url = 'http://localhost:8080/api/v1/movies';

    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

export default SendMoviesRequest;