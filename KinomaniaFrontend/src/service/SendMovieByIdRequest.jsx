import axios from "axios";


async function SendMovieByIdRequest(id) {
    const url = `http://localhost:8080/api/v1/movie/${id}`;

    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movieById:", error);
        throw error;
    }
}

export default SendMovieByIdRequest;