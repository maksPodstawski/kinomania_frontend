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

    useEffect(() => {
        async function fetchCinemas() {
            try {
                const cinemaList = await SendCinemasRequest();
                setCinemas(cinemaList);
            } catch (error) {
                console.error("Error fetching cinemas:", error);
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
                console.error("Error fetching users:", error);
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
                console.error("Error fetching positions:", error);
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
        await SendAddEmployeeRequest(null, employeeName, employeeSurname, selectedCinema, selectedPosition, selectedUser);
    }

    return (
        <>
            <Header/>
            <div className="add-cinema-form">
                <h1>Dodawanie nowego pracownika kina</h1>

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