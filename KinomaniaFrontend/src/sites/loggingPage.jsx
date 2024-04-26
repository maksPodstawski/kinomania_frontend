import React from 'react';


const LoggingPage = () => {

    return  (
        <div class="login-form">
        <h2>Login:</h2>
        <input type="text" placeholder="Wprowadź login" required />
        <input type="password" placeholder="Wprowadź hasło" required  />
        <button type="submit">Zaloguj się</button>
        </div>);
}

export default LoggingPage;
