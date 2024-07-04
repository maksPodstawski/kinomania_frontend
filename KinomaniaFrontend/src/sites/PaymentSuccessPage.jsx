import React, {useEffect, useState} from 'react';
import {redirect, useLocation, useNavigate} from 'react-router-dom';
import handlePaymentSuccess from '../service/handlePaymentSuccess.js';
import axios from "axios";
import Header from "../components/Header.jsx";
import "../styles/successPaymentStyle.css"

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
                throw error;
            }
        }

        fetchPayment();
    }, [paymentId, payerID]);

    const handleHome = () => {
        navigate('/');
    }

    return (
        <div>
            <Header/>
            <div className="success-container">
                {response && response.status === 'success' ? (
                    <>
                        <p className="success-text">Płatność powiodła się</p>
                        <button onClick={handleHome}>Wróć na stronę główną</button>
                    </>
                ) : (
                    <p>Płatność nie powiodła się</p>
                )}</div>
        </div>
    );
};

export default PaymentSuccessPage;
