import React, { useState } from "react";
import Nav from "../components/Nav.jsx";
import logo from "../img/Homepage/logo.png"
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
            setTimeout(() => {
                navigate("/login");
            }, 2000);
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
        <section className="bg-gray-50 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
                <a
                href="#"
                className="flex items-center mb-4 text-2xl font-semibold text-gray-900"
                >
                <div className="w-8 h-8 mr-2 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">T</span>
                </div>
                ToEverything
                </a>
                
                <div className="w-full bg-white rounded-lg shadow max-w-md">
                <div className="p-6 space-y-4">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                    Create your account
                    </h1>
                    
                    <div className="space-y-3">
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900">
                        Your username
                        </label>
                        <input
                        type="text"
                        name="username"
                        id="username"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-sm"
                        placeholder="yourUsername"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">
                        Your email
                        </label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-sm"
                        placeholder="your@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password1" className="block mb-1 text-sm font-medium text-gray-900">
                        Password
                        </label>
                        <input
                        type="password"
                        name="password1"
                        id="password1"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-sm"
                        value={formData.password1}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password2" className="block mb-1 text-sm font-medium text-gray-900">
                        Confirm password
                        </label>
                        <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-sm"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            required
                            />
                        </div>
                        <div className="ml-2 text-sm">
                            <label htmlFor="remember" className="text-gray-500">
                            Remember me
                            </label>
                        </div>
                        </div>
                        <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline"
                        >
                        Forgot password?
                        </a>
                    </div>
                    
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                    >
                        Create Account
                    </button>
                    
                    <p className="text-sm font-light text-gray-500 text-center">
                        Already have an account?{' '}
                        <a
                        href="/login"
                        className="font-medium text-blue-600 hover:underline"
                        >
                        Sign in
                        </a>
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;