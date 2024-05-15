import React from 'react';
import '../styles/MovieCardStyle.css'
import {useNavigate} from "react-router-dom";

const CinemasCard = ({ cinema }) => {
    const navigate = useNavigate();

    const goToScreenings = (city) => {
        navigate(`/getScreening/${city}`);
    }

    return (
        <div onClick={() => goToScreenings(cinema.city)} className="cinema-card">
            {/*<img src={cinema.img_url} alt={cinema.title} />*/}
            <img src="https://thumbs.rynekpierwotny.pl/2fafa89d:zOS_yaMGfjBPbxmw4n6LzhUpjEc/1160x638/filters:upscale():format(jpg)/articles/gallery/image/12209/stare-miasto-w-poznaniu_1bad3c.jpg" />
            <div className="cinema-info">
                <h2>{cinema.city}</h2>
                <p><strong>Adres:</strong> {cinema.address}</p>
                <i className="gg-log-in"></i>
            </div>
        </div>
    );
}

export default CinemasCard;