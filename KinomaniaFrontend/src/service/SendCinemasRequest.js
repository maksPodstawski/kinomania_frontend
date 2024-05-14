import axios from "axios";


async function SendCinemasRequest() {
    const url = 'http://localhost:8080/api/v1/getCinemas';

    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

export default SendCinemasRequest;