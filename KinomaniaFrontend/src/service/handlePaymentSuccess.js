import axios from 'axios';

const handlePaymentSuccess = async (paymentId, payerId) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/payment/success', null, {
            params: {
                paymentId: paymentId,
                PayerID: payerId
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default handlePaymentSuccess;