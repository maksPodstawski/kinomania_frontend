import axios from "axios";

const SendReservationCancel = async (reservarionUUID) => {
    try {
        const response = await axios.delete('http://localhost:8080/api/v1/payment/cancel', {
            params: {
                reservationUUID: reservarionUUID
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendReservationCancel;