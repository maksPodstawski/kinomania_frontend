import axios from "axios";


const SendPasswordRecovery = (email)=>{

    const url = 'http://localhost:8080/api/v1/passwordRecovery/' + email;

    return  axios.post(url)
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error;
        });



};

export default SendPasswordRecovery;