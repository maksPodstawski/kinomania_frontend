import Header from "../components/Header.jsx";
import {useNavigate} from "react-router-dom";
import '../styles/panelSiteStyle.css';


const PanelSite = () => {

    const navigate = useNavigate();

    const handleAddMovie = () => {
        navigate('/addmovie');
    }

    const handleRemoveMovie = () => {
        navigate('/removemovie');
    }

    const handleWrongUser = () => {
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
    const handleAddEmployee = () => {
        navigate('/addemployee');
    }
    const handleRaport=()=>{
        navigate('/raports')
    }


    if (localStorage.getItem('authorities') === "ROLE_ADMIN") {
        return (
            <>
                <Header/>
                <div className="panel-site-form">
                    <div className="panel-site">
                        <button onClick={handleAddMovie} className="panel-button">Dodaj Film</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleRemoveMovie} className="panel-button">Usuń Film</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleAddCinema} className="panel-button">Dodaj Kino</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleRemoveCinema} className="panel-button">Usuń Kino</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleAddRoomToCinema} className="panel-button">Dodaj salę</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleAddScreening} className="panel-button">Dodaj seans</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleAddEmployee} className="panel-button">Dodaj pracownika</button>
                    </div>
                    <br/>
                    <div className="panel-site">
                        <button onClick={handleRaport} className="panel-button">System Raportowania</button>
                    </div>
                </div>
            </>
        );
    } else {
        handleWrongUser();
    }
}

export default PanelSite;