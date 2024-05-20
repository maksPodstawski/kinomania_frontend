import React, {useEffect, useState} from 'react';
import {redirect, useLocation} from 'react-router-dom';
import SendSeatReservationRequest from "../service/SendSeatReservationRequest.jsx";
import SendReservationRequest from "../service/SendReservationWithPayment.jsx";

const PaymentPage = () => {

    const location = useLocation();
    const { screeningID, seats } = location.state || {};

    const handleNoPayment = async () => {
        await SendSeatReservationRequest(screeningID, seats);
    }

    const handlePayment = async () => {
        const response = await SendReservationRequest(screeningID, seats);
        console.log(response.data.url);
        if(response.data.status === "created"){
            window.location.href = response.data.url;
        }
    }

    return(
        <div>
            <h1>Płatność</h1>
            <p>Screening ID: {screeningID}</p>
            <p>Seats: {seats?.join(', ')}</p>
            <button onClick={handlePayment}>Zapłać teraz przez PayPal</button>
            <button onClick={handleNoPayment}>Zapłać na miejscu</button>
        </div>
    );
}

export default PaymentPage;