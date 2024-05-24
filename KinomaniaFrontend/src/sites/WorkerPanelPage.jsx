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

    if (localStorage.getItem('authorities') === "ROLE_WORKER") {
        return (
            <>
                <Header/>
                <div className="content">
                    <button onClick={onAddScrenning}>Dodaj seans</button>
                </div>
            </>
        )
    }
    else{
        handleWrongUser();
    }
}

export default WorkerPanelPage;