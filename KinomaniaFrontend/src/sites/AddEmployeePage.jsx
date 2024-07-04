import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import '../styles/addCinemaStyle.css';
import SendCinemasRequest from "../service/SendCinemasRequest.js";
import SendAddEmployeeRequest from "../service/SendAddEmployeeRequest.jsx";
import SendUsersRequest from "../service/SendUsersRequest.jsx";
import SendPositionsRequest from "../service/SendPositionsRequest.jsx";

function AddEmployeePage() {
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeSurname, setEmployeeSurname] = useState("");
    const [cinemas, setCinemas] = useState([]);
    const [users, setUsers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchCinemas() {
            try {
                const cinemaList = await SendCinemasRequest();
                setCinemas(cinemaList);
            } catch (error) {
                throw error;
            }
        }
        fetchCinemas();
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                let userList = await SendUsersRequest();
                userList = userList.filter(user => user.role === 'ROLE_USER');
                setUsers(userList);
            } catch (error) {
                throw error;
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        async function fetchPositions() {
            try {
                const positionList = await SendPositionsRequest();
                setPositions(positionList);
            } catch (error) {
                throw error;
            }
        }
        fetchPositions();
    }, []);

    const handleCinemaChange = (event) => {
        setSelectedCinema(event.target.value);
    };

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleNameChange = (event) => {
        setEmployeeName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setEmployeeSurname(event.target.value);
    };

    const handleSubmit = async () => {
        if(!selectedCinema) {
            setError("Proszę wybrać kino.");
            return;
        }
        if (!selectedUser) {
            setError("Proszę wybrać użytkownika.");
            return;
        }
        if (!selectedPosition) {
            setError("Proszę wybrać stanowisko.");
            return;
        }
        if (!employeeName) {
            setError("Proszę wpisać imię.");
            return;
        }
        if (!employeeSurname) {
            setError("Proszę wpisać nazwisko.");
            return;
        }

        await SendAddEmployeeRequest(null, employeeName, employeeSurname, selectedCinema, selectedPosition, selectedUser);
    }

    return (
        <>
            <Header/>
            <div className="add-cinema-form">
                <h1>Dodawanie nowego pracownika kina</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <select onChange={handleCinemaChange} value={selectedCinema}>
                    <option value="">Wybierz kino</option>
                    {cinemas.map(cinema => (
                        <option key={cinema.cinema_id} value={cinema.cinema_id}>
                            {cinema.city} - {cinema.address}
                        </option>
                    ))}
                </select>
                <br/>
                <select onChange={handleUserChange} value={selectedUser}>
                    <option value="">Wybierz użytkownika</option>
                    {users.map(user => (
                        <option key={user.user_id} value={user.user_id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <br/>
                <select onChange={handlePositionChange} value={selectedPosition}>
                    <option value="">Wybierz stanowisko</option>
                    {positions.map(position => (
                        <option key={position.position_id} value={position.position_id}>
                            {position.position_name}
                        </option>
                    ))}
                </select>
                <br/>
                <input id="name" name="name" type="text" placeholder="Wprowadź Imię pracownika"
                       required onChange={handleNameChange}/>
                <br/>
                <input id="surname" name="surname" type="text" placeholder="Wprowadź Nazwisko pracownika"
                       required onChange={handleSurnameChange}/>
                <br/>
                <button onClick={handleSubmit} type="submit">Dodaj pracownika</button>
            </div>
        </>);
}

export default AddEmployeePage;