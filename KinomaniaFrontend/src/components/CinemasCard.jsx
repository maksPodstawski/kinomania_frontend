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
            <img src="https://thumbs.rynekpierwotny.pl/2fafa89d:zOS_yaMGfjBPbxmw4n6LzhUpjEc/1160x638/filters:upscale():format(jpg)/articles/gallery/image/12209/stare-miasto-w-poznaniu_1bad3c.jpg" />
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