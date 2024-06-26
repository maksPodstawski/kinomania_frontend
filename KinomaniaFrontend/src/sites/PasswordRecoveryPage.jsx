import {useParams} from "react-router-dom";
import {useState} from "react";
import SendPasswordRecovery from "../service/SendPasswordRecovery.js";

const PasswordRecoveryPage = () => {

    const { code } = useParams();
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const handleFirstPasswordChange = (e) => {
        setFirstPassword(e.target.value);
    }
    const handleSecondPasswordChange = (e) => {
        setSecondPassword(e.target.value);
    }
    const handleSubmit =()=>{
        if(!firstPassword.length && !secondPassword.length){alert("Pola nie mogą być puste")}
        else if(firstPassword !== secondPassword){alert("Hasła muszą być takie same")}
        else{
            SendPasswordRecovery(code, firstPassword);
        }
    }

    return(
        <>
            <p>{code}</p>
            <div className="password-recovery-inputs">
                <input onChange={handleFirstPasswordChange} type="password"/>
                <input onChange={handleSecondPasswordChange} type="password"/>
            </div>
            <button onClick={handleSubmit}>Zmien</button>
        </>
    )
}

export default PasswordRecoveryPage;