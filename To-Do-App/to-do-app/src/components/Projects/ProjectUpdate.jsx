import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";

const ProjectUpdate = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        project_name:"",
        project_description:"",
        project_startDate:"", 
        project_endDate:"", 
        collaborator_emails:""
    });

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/projects/details/${id}/`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
        })
        .then(response => {
            const projectData = response.data;
            
            if (projectData.users && Array.isArray(projectData.users)){
                const emails = projectData.users.map(user => user.email).join(', ');
                projectData.collaborator_emails = emails;
            }

            setFormData(projectData);
            setLoading(false);
        })
        .catch(err => {
            console.error(err || "Unknown error while fetching details")
            setError(err);
            setLoading(false);
        });
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const emailData = {
            ...formData,
            collaborator_emails: formData.collaborator_emails
                .split(',')
                .map(email => email.trim())
                .filter(email => email !== "")
        }

        axios.put(`http://127.0.0.1:8000/projects/update/${id}/`, emailData,{
            headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(response => {
            setFormData(response.data);
            setSuccess(true);
            setTimeout(() => {
                navigate("/projects")
            }, 2000);
        })
        .catch(err =>{
            console.log("Failed to update project", err);
            setError(err);
        });
    };

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <div className="text-center p-5 text-red-500">Error: {error.message}</div>; 

    return(
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Category</h2>
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Category updated successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text"
                        id="project_name" 
                        name="project_name" 
                        value={formData.project_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type="text"
                        id="project_description"
                        name="project_description" 
                        value={formData.project_description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Start date</label>
                    <input 
                        type="date"
                        id="project_startDate"
                        name="project_startDate" 
                        value={formData.project_startDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>End date</label>
                    <input 
                        type="date" 
                        id="project_endDate"
                        name="project_endDate"
                        value={formData.project_endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text" 
                        id="collaborator_emails"
                        name="collaborator_emails" 
                        value={formData.collaborator_emails}
                        onChange={handleChange}
                        placeholder="Enter email addresses separated by commas"
                    />
                    <small className="">Enter collaborator email addresses separated by commas</small>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default ProjectUpdate;