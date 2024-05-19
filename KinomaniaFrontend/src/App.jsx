import React from 'react';
import './App.css';
import LoginComponent from "./components/LoginComponent.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from "./components/RegisterComponent.jsx";
import HomeSite from "./sites/HomeSite.jsx";
import AddMoviePage from "./sites/AddMoviePage.jsx";
import PanelSite from "./sites/PanelSite.jsx";
import CinemasPage from "./sites/CinemasPage.jsx";
import SeatReservationPage from "./sites/SeatReservationPage.jsx";
import ScreeningForCinema from "./components/ScreeningForCinema.jsx";
import RemoveMoviePage from "./sites/RemoveMoviePage.jsx";
import AddCinemaPage from "./sites/AddCinemaPage.jsx";
import AddRoomToCinemaPage from "./sites/AddRoomToCinemaPage.jsx";
import RemoveCinemaPage from "./sites/RemoveCinemaPage.jsx";
import AddScreeningPage from "./sites/AddScreeningPage.jsx";


function App() {



    return (
        <div>
        <Router>
            <Routes>
                <Route index element={<HomeSite />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/addmovie" element={<AddMoviePage />} />
                <Route path="/panel" element={<PanelSite />} />
                <Route path="/cinemas" element={<CinemasPage />} />
                <Route path="/getScreening/:city" element={<ScreeningForCinema />} />
                <Route path="/reservation" element={<SeatReservationPage />} />
                <Route path="/removemovie" element={<RemoveMoviePage />} />
                <Route path="/reservation/:screening_id" element={<SeatReservationPage />} />
                <Route path="/removecinema" element={<RemoveCinemaPage />} />
                <Route path="/addcinema" element={<AddCinemaPage />} />
                <Route path="/addroomtocinema" element={<AddRoomToCinemaPage />} />
                <Route path="/addscreening" element={<AddScreeningPage />} />
            </Routes>
        </Router>

        </div>
    );
}

export default App;
