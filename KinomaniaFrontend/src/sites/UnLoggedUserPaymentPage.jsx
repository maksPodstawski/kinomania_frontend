import {useLocation} from "react-router-dom";
import SendUnloggedUserReservationRequest from "../service/SendUnloggedUserReservationRequest.jsx";
import SendUnloggedUserReservationWithPayment from "../service/SendUnloggedUserReservationWithPayment.jsx";


const UnLoggedUserPaymentPage = ()=>{
    const location = useLocation();
    const data = location.state.data;

    const sendReservationWithoutPayment = async ()=>{
        const response = await SendUnloggedUserReservationRequest(data);
        console.log(response);
    }

    const sendReservationWithPayment = async ()=>{
        const response = await SendUnloggedUserReservationWithPayment(data);
        console.log(response);
        if(response.data.status === "created"){
            window.location.href = response.data.url;
        }
    }

    return(
        <>
            <p>Wybierz formę płatności</p>
            <button onClick={sendReservationWithoutPayment}>Zapłać w kinie</button>
            <button onClick={sendReservationWithPayment}>Zapłać poprzez paypal</button>
        </>
    )
}
export default UnLoggedUserPaymentPage;