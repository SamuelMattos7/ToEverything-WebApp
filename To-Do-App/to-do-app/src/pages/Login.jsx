import React, { useState } from "react";
import "../css/Login.css";
import Nav from '../components/Nav.jsx'; 
import axios from "axios";

function LoginPage() {

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

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
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData)
      console.log("Full response data:", JSON.stringify(response.data));
      console.log("Sucess", response.data)
      localStorage.setItem("accessToken", response.data.token.access);
      localStorage.setItem("refreshToken", response.data.token.refresh);
      setSucessMessage("Login successful")
    }
    catch(error){
      console.log("Error ocurred dunring login", error.response?.data);
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
                  <h1>Log in</h1>
                  <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange}/><br/>
                  <input type="password" name="password" value={formData.password} placeholder="********" onChange={handleChange}/><br/>
                  <button className="login-button" type="submit" disabled={isLoading} onClick={handleSubmit}>log in</button>
                  </fieldset>
                </form>
                <a className='option' href="/register">or sign up</a>
            </div>
        </div>
    </div>
  );
}


export default LoginPage;