import axios from "axios";


async function SendCinemasRequest() {
    const url = 'http://localhost:8080/api/v1/getCinemas';

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendCinemasRequest;