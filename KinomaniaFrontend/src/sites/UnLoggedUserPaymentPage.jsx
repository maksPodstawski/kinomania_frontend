import {useLocation} from "react-router-dom";
import SendUnloggedUserReservationRequest from "../service/SendUnloggedUserReservationRequest.jsx";

const UnLoggedUserPaymentPage = ()=>{
    const location = useLocation();
    const data = location.state.data;

    const sendReservationWithoutPayment = async ()=>{
        const response = await SendUnloggedUserReservationRequest(data);
        console.log(response);
    }

    return(
        <>
            <p>Wybierz formę płatności</p>
            <button onClick={sendReservationWithoutPayment}>Zapłać w kinie</button>
        </>
    )
}
export default UnLoggedUserPaymentPage;