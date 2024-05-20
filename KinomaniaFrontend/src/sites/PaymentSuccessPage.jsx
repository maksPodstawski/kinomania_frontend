import React, { useEffect, useState } from 'react';
import {redirect, useLocation, useNavigate} from 'react-router-dom';
import handlePaymentSuccess from '../service/handlePaymentSuccess.js';
import axios from "axios";

const PaymentSuccessPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const navigate = useNavigate();

    const paymentId = searchParams.get('paymentId');
    const token = searchParams.get('token');
    const payerID = searchParams.get('PayerID');

    const [response, setResponse] = useState(null);

    useEffect(() => {
        async function fetchPayment() {
            try {
                const res = await handlePaymentSuccess(paymentId, payerID);
                setResponse(res);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }

        fetchPayment();
    }, [paymentId, payerID]);

    const handleHome = ()=>{
        navigate('/');
    }

    return (
        <div>
            {response && response.status === 'success' ? (
                <>
                    <p>Płatność powiodła się</p>
                    <button onClick={handleHome}>Wróć na stronę główną</button>
                </>
            ) : (
                <p>Płatność nie powiodła się</p>
            )}
        </div>
    );
};

export default PaymentSuccessPage;
