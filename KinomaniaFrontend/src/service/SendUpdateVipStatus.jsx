import axios from "axios";

const SendUpdateVipStatus = async (userID)=>{
    const url = 'http://localhost:8080/api/v1/worker/setVipStatus/' + userID;

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }


    return  axios.put(url, "", {headers: headers})
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error;
        });
}
export default SendUpdateVipStatus;