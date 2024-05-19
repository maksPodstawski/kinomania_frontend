import Header from "../components/Header.jsx";
import {useNavigate} from "react-router-dom";


const PanelSite = () => {

    const navigate = useNavigate();

    const handleAddMovie = () => {
        navigate('/addmovie');
    }

    const handleRemoveMovie = () => {
        navigate('/removemovie');
    }

    const handleWrongUser = ()=>{
        navigate('/');
    }

    const handleAddCinema = () => {
        navigate('/addcinema');
    }

    const handleRemoveCinema = () => {
        navigate('/removecinema');
    }

    const handleAddScreening = () => {
        navigate('/addscreening');
    }

    const handleAddRoomToCinema = () => {
        navigate('/addroomtocinema');
    }
    if (localStorage.getItem('authorities') === "ROLE_ADMIN") {
        return (
            <>
                <Header/>
                <div className="panel-site">
                    <button onClick={handleAddMovie}>Dodaj Film</button>
                </div>
                <br/>
                <div className="panel-site">
                    <button onClick={handleRemoveMovie}>Usuń Film</button>
                </div>
                <br/>
                <div className="panel-site">
                    <button onClick={handleAddCinema}>Dodaj Kino</button>
                </div>
                <br/>
                <div className="panel-site">
                    <button onClick={handleRemoveCinema}>Usuń Kino</button>
                </div>
                <br/>
                <div className="panel-site">
                    <button onClick={handleAddRoomToCinema}>Dodaj salę</button>
                </div>
                <br/>
                <div className="panel-site">
                    <button onClick={handleAddScreening}>Dodaj seans</button>
                </div>
            </>
        );
    } else {
        handleWrongUser();
    }
}

export default PanelSite;