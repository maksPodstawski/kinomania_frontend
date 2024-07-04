import {useLocation, useNavigate} from "react-router-dom";
import SendUnloggedUserReservationRequest from "../service/SendUnloggedUserReservationRequest.jsx";
import SendUnloggedUserReservationWithPayment from "../service/SendUnloggedUserReservationWithPayment.jsx";
import Header from "../components/Header.jsx";


const UnLoggedUserPaymentPage = ()=>{
    const location = useLocation();
    const data = location.state.data;
    const navigate = useNavigate();

    const sendReservationWithoutPayment = async ()=>{
        const response = await SendUnloggedUserReservationRequest(data);
        if(response.data.statusCode === 1){
            alert("Pomyślnie dokonano rezerwacji");
            navigate('/');
        }
    }

    const sendReservationWithPayment = async ()=>{
        const response = await SendUnloggedUserReservationWithPayment(data);
        if(response.data.status === "created"){
            window.location.href = response.data.url;
        }
    }

    return(
        <>
            <Header/>
            <div className="payment-page-container">
                <h2>Wybierz formę płatności</h2>
                <button className="payment-page-button" onClick={sendReservationWithoutPayment}>Zapłać w kinie</button>
                <button className="payment-page-button" onClick={sendReservationWithPayment}>Zapłać poprzez paypal</button>
            </div>
        </>
    )
}
export default UnLoggedUserPaymentPage;