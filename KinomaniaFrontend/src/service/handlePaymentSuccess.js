import axios from 'axios';

const handlePaymentSuccess = async (paymentId, payerId) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/payment/success', null, {
            params: {
                paymentId: paymentId,
                PayerID: payerId
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during payment:', error);
        throw error;
    }
};

export default handlePaymentSuccess;