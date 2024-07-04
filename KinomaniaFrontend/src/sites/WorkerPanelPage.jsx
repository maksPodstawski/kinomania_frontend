import Header from "../components/Header.jsx";
import '../styles/workerPanelStyles.css';
import {useNavigate} from "react-router-dom";

const WorkerPanelPage = () => {

    const navigate = useNavigate();

    const onAddScrenning = () => {
        navigate("/workeraddscreening");
    }
    const handleWrongUser = () => {
        navigate('/');
    }
    const handleAddVipStatus = () =>{
        navigate('/addvipstatus');
    }

    if (localStorage.getItem('authorities') === "ROLE_WORKER") {
        return (
            <>
                <Header/>
                <div className="worker-panel-content">
                    <button onClick={onAddScrenning}>Dodaj seans</button>
                    <button onClick={handleAddVipStatus}>Nadaj status VIP</button>
                </div>
            </>
        )
    }
    else{
        handleWrongUser();
    }
}

export default WorkerPanelPage;