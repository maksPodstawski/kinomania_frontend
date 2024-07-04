import React, {useEffect, useState} from 'react';
import {redirect, useLocation, useNavigate} from 'react-router-dom';
import SendSeatReservationRequest from "../service/SendSeatReservationRequest.jsx";
import SendReservationRequest from "../service/SendReservationWithPayment.jsx";
import "../styles/paymentPage.css"
import Header from "../components/Header.jsx";

const PaymentPage = () => {

    const location = useLocation();
    const {screeningID, seats, seatsNumbers} = location.state || {} || {};

    const navigate = useNavigate();

    const handleNoPayment = async () => {
        const response = await SendSeatReservationRequest(screeningID, seats);
        if(response.data.statusCode === 1){
            alert("Rezerwacja udana");
            navigate("/");
        }
    }

    const handlePayment = async () => {
        const response = await SendReservationRequest(screeningID, seats);
        if (response.data.status === "created") {
            window.location.href = response.data.url;
        }
    }


    return (
        <>
            <Header/>
            <div className="payment-page-container">
                <h1>Płatność</h1>
                <p>Wybrane siedzenia: {seatsNumbers}</p>
                <button onClick={handlePayment} className="payment-page-button">Zapłać teraz przez PayPal</button>
                <button onClick={handleNoPayment} className="payment-page-button">Zapłać na miejscu</button>
            </div>
        </>
    );
}

export default PaymentPage;