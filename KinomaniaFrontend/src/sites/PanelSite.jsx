import Header from "../components/Header.jsx";
import {useNavigate} from "react-router-dom";


const PanelSite = () => {

    const navigate = useNavigate();

    const handleAddMovie = () => {
        navigate('/addmovie');
    }

    const handleWrongUser = ()=>{
        navigate('/');
    }

    if (localStorage.getItem('authorities') === "ROLE_ADMIN") {
        return (
            <>
                <Header/>
                <div className="panel-site">
                    <button onClick={handleAddMovie}>Dodaj Film</button>
                </div>
            </>
        );
    }
    else{
        handleWrongUser();
    }
}

export default PanelSite;