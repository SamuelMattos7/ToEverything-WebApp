import React, { useState } from "react";
import "../css/Register.css";
import Nav from "../components/Nav.jsx";
import axios from "axios";

function RegisterPage() {

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    };

    const [isLoading, setIsLoading] = useState(false);
    const[sucessMessage, setSucessMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLoading){
            return
        }

        setIsLoading(true);

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData)
            console.log("Sucess", response.data)
            setSucessMessage("Registration successful")
        }
        catch(error){
            console.log("Error ocurred dunring registration", error.response?.data);
            if(error.response && error.response.data){
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if(errorMessages && errorMessages.length > 0){
                        setError(errorMessages[0]);
                    }
                })
            }
        }
        finally{
            setIsLoading(false);
        }
    }
    

    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="loginForm">
                <div className="form-container">
                    {error && <p style={{color:"red", fontFamily:"sans-serif"}}>{error}</p>}
                    {sucessMessage && <p style={{fontFamily:"sans-serif"}}>{sucessMessage}</p>}
                    <form>
                        <fieldset>
                        <h1>Sign up</h1>
                        <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleChange}/><br/>
                        <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange}/><br/>
                        <input type="password" name="password1" value={formData.password1} placeholder="********" onChange={handleChange}/><br/>
                        <input type="password" name="password2" value={formData.password2} placeholder="********" onChange={handleChange}/><br/>
                        <button className="login-button" type="submit" disabled={isLoading} onClick={handleSubmit}>Register</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default RegisterPage;