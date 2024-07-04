import axios from "axios";


async function SendScreeningsRequest(city) {
    const url = `http://localhost:8080/api/v1/getScreening/${city}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendScreeningsRequest;