import axios from "axios";


const SendPasswordRecovery = (code, password)=>{

    const url = 'http://localhost:8080/api/v1/updatePassword';
    const data = {
        recoveryCode: code,
        newPassword: password
    }


    return  axios.post(url, data)
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error;
        });



};

export default SendPasswordRecovery;