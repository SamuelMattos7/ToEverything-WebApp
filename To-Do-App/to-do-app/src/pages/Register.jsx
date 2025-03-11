import React from "react";
import "../css/Register.css";
import Nav from "../components/Nav.jsx"
import Footer from "../components/Footer.jsx"

function RegisterPage() {
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="loginForm">
                <div className="form-container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <fieldset>
                        <h1>Sign up</h1>
                        <input type="text" id="username" name="username" placeholder="Username"/><br/>
                        <input type="password" id="password" name="password" placeholder="********"/><br/>
                        <button className="login-button" type="submit">log in</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default RegisterPage;