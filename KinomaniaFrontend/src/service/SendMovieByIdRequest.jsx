import axios from "axios";


async function SendMovieByIdRequest(id) {
    const url = `http://localhost:8080/api/v1/movie/${id}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendMovieByIdRequest;