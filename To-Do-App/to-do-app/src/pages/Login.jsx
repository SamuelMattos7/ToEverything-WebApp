import React from 'react';
import "../css/Login.css";
import Nav from '../components/Nav.jsx'; 

function LoginPage() {
  return (
    <div>
        <header>
            <Nav/>
        </header>
        <div className="loginForm">
            <div className="form-container">
                <form onSubmit={(e) => e.preventDefault()}>
                  <fieldset>
                  <h1>Log in</h1>
                  <input type="text" id="username" name="username" placeholder="username"/><br/>
                  <input type="password" id="password" name="password" placeholder="password"/><br/>
                  <button className="login-button" type="submit">log in</button>
                  </fieldset>
                </form>
                <a className='option' href="/register">or sign up</a>
            </div>
        </div>
    </div>
  );
}


export default LoginPage;