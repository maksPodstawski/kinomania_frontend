import React from 'react';
import '../styles/cinemaCardSyle.css'
import {useNavigate} from "react-router-dom";

const CinemasCard = ({ cinema }) => {
    const navigate = useNavigate();

    const goToScreenings = (city) => {
        navigate(`/getScreening/${city}`);
    }

    return (
        <div onClick={() => goToScreenings(cinema.city)} className="cinema-card1">
            <img src={cinema.image_url} alt={cinema.city}/>
            <div className="cinema-info">
                <h2>{cinema.city}</h2>
                <div className="cinema-icon">
                    <i className="gg-pin"></i><p> {cinema.address}</p>
                </div>

            </div>
        </div>
    );
};

export default CinemasCard;