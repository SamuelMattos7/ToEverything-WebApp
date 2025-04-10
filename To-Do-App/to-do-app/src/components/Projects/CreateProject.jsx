import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CreateProject = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        project_name:"", 
        creator:"",
        project_description:"", 
        project_startDate:"", 
        project_endDate:"", 
        users:""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(...formData, {[e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:8000/projects/create/', formData, 
            {headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}}
        )
        .then(response => {
            setSuccess(true);
            setTimeout(() => {
                navigate("/tasks");
            }, 2000);
        })
        .catch(err => {
            console.log("Error while creating project", err)
            setError(err.response?.data || "Unknown error");
        })
    }

}