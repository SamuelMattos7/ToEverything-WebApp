import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";

const ProjectUpdate = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const[project, setProject] = useState({
        project_name:"",
        project_description:"",
        project_startDate:"", 
        project_endDate:"", 
        users:""
    });

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchContacts = async() => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/users-list/', {
                    headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
                });   
                setContacts(response.data); 
            }catch(error){
                console.error('Error fetching contacts: ', error);
            }
        }
        fetchContacts();
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/projects/details/${id}/`, 
            {headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
        })
        .then(response => {
            setProject(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        })
    }, [id]);

    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/projects/update/${id}/`, project, {
            headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(response => {
            setProject(response.data);
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
                        value={project.project_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type="text"
                        id="project_description"
                        name="project_description" 
                        value={project.project_description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Start date</label>
                    <input 
                        type="date"
                        id="project_startDate"
                        name="project_startDate" 
                        value={project.project_startDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>End date</label>
                    <input 
                        type="date" 
                        id="project_endDate"
                        name="project_endDate"
                        value={project.project_endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Collaborators</label>
                    <select 
                        name="users" 
                        id="users" 
                        value={project.users} 
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
            </form>
        </div>
    );
}

export default ProjectUpdate;