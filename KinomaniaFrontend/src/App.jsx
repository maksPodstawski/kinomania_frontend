import React from 'react';
import './App.css';
import LoginComponent from "./components/LoginComponent.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from "./components/RegisterComponent.jsx";
import HomeSite from "./sites/HomeSite.jsx";
import AddMoviePage from "./sites/AddMoviePage.jsx";
import PanelSite from "./sites/PanelSite.jsx";
import Cinemas from "./components/Cinemas.jsx";


function App() {



    return (
        <div>
        <Router>
            <Routes>
                <Route index element={<HomeSite />}/>
                <Route path="/login" element={<LoginComponent /> } />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/addmovie" element={<AddMoviePage/>}/>
                <Route path="/panel" element={<PanelSite />}/>
                <Route path="/cinemas" element={<Cinemas />}/>
            </Routes>
        </Router>

        </div>
    );
}

export default App;
