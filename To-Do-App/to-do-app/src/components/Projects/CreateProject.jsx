import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const CreateProject = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        project_name:"", 
        project_description:"", 
        project_startDate:"", 
        project_endDate:"", 
        collaborator_emails:""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailsData = {
            ...formData,
            collaborator_emails: formData.collaborator_emails
                .split(',')
                .map(email => email.trim())
                .filter(email => email !== "")
        };

        axios.post('http://127.0.0.1:8000/projects/create/', emailsData, 
            {headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}}
        )
        .then(response => {
            setFormData(response.data);
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
    
    return(
        <div>
            <h2>Create project</h2>
            {success && <p style={{ color: "green" }}>Task created successfully!</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="project_name" 
                        value={formData.project_name} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        type="text" 
                        name="project_description" 
                        value={formData.project_description} 
                        onChange={handleChange} required 
                    />
                </div>
                <div>
                    <label>Start date</label>
                    <input 
                        type="date" 
                        name="project_startDate" 
                        value={formData.project_startDate} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>End date</label>
                    <input 
                        type="date" 
                        name="project_endDate" 
                        value={formData.project_endDate} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Collaborators</label>
                    <input
                        type="text" 
                        name="collaborator_emails" 
                        value={formData.collaborator_emails}
                        onChange={handleChange}
                        placeholder="Enter email addresses separated by commas"
                    />
                    <small>Enter collaborator email addresses separated by commas</small>
                </div>
                <button type="submit">Create project</button>
            </form>
        </div>
    );
}

export default CreateProject;