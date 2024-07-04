import React, {useEffect, useState} from "react";
import GetUsersTicketAmount from "../service/GetUsersTicketAmount.jsx";
import SendUpdateVipStatus from "../service/SendUpdateVipStatus.jsx";
import {SendUsersTicketsAmountRequest} from "../service/RaportRequests.js";
import Header from "../components/Header.jsx";
import "../styles/addVipPageStyles.css"

const AddVipStatusPage = () => {
    const [start, setStartDate] = useState('');
    const [end, setEndDate] = useState('');

    const [data, setData] = useState({});

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


    const handleAddVipStatus = async (userID) => {
        const timeSpan = {
            startDate: start,
            endDate: end
        }
        const response = await SendUpdateVipStatus(userID);
        const res = await SendUsersTicketsAmountRequest(timeSpan);
        setData(res);
    }

    return (
        <div>
            <Header/>
            <div className="worker-panel-page-content">
                <div className="worker-panel-page-dates">
                    <label className="startDate">Data początkowa:</label>
                    <input type="date" value={start} onChange={handleStartDateChange} id="startDate"
                           name="startDate"
                           required/>
                    <label className="endDate">Data końcowa:</label>
                    <input type="date" value={end} onChange={handleEndDateChange} id="endDate" name="endDate"
                           required/>
                </div>
                <button className="worker-panel-button" onClick={handleUsersTicketsAmount}>Pokaż użytkowników</button>
                <h1>Ilość biletów zakupiona przez użytkownika</h1>
                {data.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Nazwa Użytkownika</th>
                            <th>Ilość Biletów</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data
                            .filter(user => user.userId !== null)
                            .map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userName}</td>
                                    <td>{user.ticketsCount}</td>
                                    <td>
                                        <button onClick={() => handleAddVipStatus(user.userId)}>Nadaj Status Vip
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default AddVipStatusPage;
