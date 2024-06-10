import React, { useEffect, useState } from "react";
import GetUsersTicketAmount from "../service/GetUsersTicketAmount.jsx";
import SendUpdateVipStatus from "../service/SendUpdateVipStatus.jsx";

const AddVipStatusPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetUsersTicketAmount();
                // Ensure the data is an array
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Received data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching users' ticket amount:", error);
            }
        };

        fetchData();
    }, []);

    const handleAddVipStatus =  async (userID) => {
        const response =  await SendUpdateVipStatus(userID);
        console.log(response);
    }

    return (
        <div>
            <h1>Users' Tickets</h1>
            {users.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Ilość Biletów</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users
                        .filter(user => user.userId !== null)
                        .map((user, index) => (
                            <tr key={index}>
                                <td>{user.userId}</td>
                                <td>{user.ticketsCount}</td>
                                <td><button onClick={() => handleAddVipStatus(user.userId)}>Nadaj Status Vip</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default AddVipStatusPage;
