import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const CreateProject = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [contacts, setContacts] = useState([ ]);

    const [formData, setFormData] = useState({
        project_name:"", 
        project_description:"", 
        project_startDate:"", 
        project_endDate:"", 
        users:""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/users-list/', {
                    headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
                });
                setContacts(response.data);
            }
            catch(error){
                console.error('Error while fetching contacts',error);
            }
        }
        fetchContacts();
    }, []);

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
    
    return(
        <div>
            <h2>Create Task</h2>
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
                    <input 
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
                    <select 
                        name="users" 
                        id="users"
                        multiple={true}
                        value={formData.users}
                        onChange={handleChange}
                    >
                        <option value="">Select a user</option>
                        {contacts.map((user) =>(
                            <option key={user.UserID} value={user.UserID}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create project</button>
            </form>
        </div>
    );
}

export default CreateProject;