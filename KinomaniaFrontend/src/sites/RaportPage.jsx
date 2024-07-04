import sendTicketForScreenings, {
    DownloadReport,
    SendIncomePerCinemaRequest,
    SendTicketsPerMovieRequest, SendUsersTicketsAmountRequest
} from "../service/RaportRequests.js";
import {useState} from "react";
import SendTicketsPerCinemaRequest from "../service/RaportRequests.js";
import RaportTable from "../components/RaportTable.jsx";
import '../styles/raprortPageStyle.css'
import Header from "../components/Header.jsx";


const RaportPage = () => {

    const [start, setStartDate] = useState('');
    const [end, setEndDate] = useState('');


    const [data, setData] = useState();

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const checkTimeSpan = () => {
        if (start.trim().length <= 0) {
            alert('Podaj datę rozpoczęcia');
            return false;
        }
        if (end.trim().length <= 0) {
            alert('Podaj datę zakończenia');
            return false;
        }
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (startDate >= endDate) {
            alert('Data rozpoczęcia musi być przed datą zakończenia');
            return false;
        }

        return true;

    }

    const handleTicketsPerCinema = async () => {
        if (checkTimeSpan()) {
            const timeSpan = {
                startDate: start,
                endDate: end
            }
            const response = await SendTicketsPerCinemaRequest(timeSpan);
            setData(response);
        }
    }
    const handleUsersTicketsAmount = async () => {
        if (checkTimeSpan()) {
            const timeSpan = {
                startDate: start,
                endDate: end
            }
            const response = await SendUsersTicketsAmountRequest(timeSpan);
            setData(response);
        }
    }

    const handleTicketsPerMovie = async () => {
        if (checkTimeSpan()) {
            const timeSpan = {
                startDate: start,
                endDate: end
            }
            const response = await SendTicketsPerMovieRequest(timeSpan);
            setData(response);
        }
    }

    const handleIncomePerCinema = async () => {
        if (checkTimeSpan()) {
            const timeSpan = {
                startDate: start,
                endDate: end
            }
            const response = await SendIncomePerCinemaRequest(timeSpan);
            setData(response);
        }
    }
    const handleDownloadRaport = async () => {
        if (checkTimeSpan()) {
            const timeSpan = {
                startDate: start,
                endDate: end
            }
            await DownloadReport(timeSpan);
        }
    }

    return (
        <>
            <Header/>
            <div className="raport-page-cointainer">
                <div className="raport-page-inputs">
                    <div className="raport-page-dates">
                        <label className="startDate">Data początkowa:</label>
                        <input type="date" value={start} onChange={handleStartDateChange} id="startDate"
                               name="startDate"
                               required/>
                        <label className="endDate">Data końcowa:</label>
                        <input type="date" value={end} onChange={handleEndDateChange} id="endDate" name="endDate"
                               required/>
                    </div>
                    <div className="raport-page-buttons">
                        <button className="raport-page-button" onClick={handleTicketsPerCinema}>Bilety na Kino</button>
                        <button className="raport-page-button" onClick={handleUsersTicketsAmount}>Bilety na Użytkownika
                        </button>
                        <button className="raport-page-button" onClick={handleTicketsPerMovie}>Bilety na Film</button>
                        <button className="raport-page-button" onClick={handleIncomePerCinema}>Dochód na Kino</button>
                        <button className="raport-page-button-download" onClick={handleDownloadRaport}>Pobierz raport</button>
                    </div>
                </div>
                <div className="raport-page-table">
                    <RaportTable data={data}/>
                </div>
            </div>
        </>
    )
}

export default RaportPage;