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
        <div className="bg-gradient-to-b from-slate-200 to-slate-300 p-4 bg-opacity-80">
            <form onSubmit={handleSubmit} className=" grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-4 w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white rounded-xl">
                <div><h2 className=" font-bold text-xl font-sans">Update {formData.project_name}</h2></div>
                
                <div className="col-span-full">
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input 
                        type="text"
                        id="project_name" 
                        name="project_name" 
                        value={formData.project_name}
                        onChange={handleChange}
                        required
                        className="block !w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    />
                </div>
                
                <div className="col-span-full">
                    <label className="block mb-2 font-medium text-sm ">Description</label>
                    <textarea 
                        rows={4}
                        id="project_description"
                        name="project_description" 
                        value={formData.project_description}
                        onChange={handleChange}
                        required
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <div className="flex justify-between gap-x-4">
                    <div>
                        <label htmlFor="start_date" className="block mb-2 text-sm font-medium">Start date</label>
                        <input 
                            type="date" 
                            name="Start_date" 
                            value={formData.project_startDate} 
                            onChange={handleChange} 
                            className="block w-66 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="end_date" className="block mb-2 text-sm font-medium">Due date</label>
                        <input 
                            type="date" 
                            name="end_date" 
                            value={formData.project_endDate} 
                            onChange={handleChange} 
                            className="block w-66 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="" className="block mb-2 text-sm font-medium">Collaborators</label>
                    <input
                        type="text" 
                        id="collaborator_emails"
                        name="collaborator_emails" 
                        value={formData.collaborator_emails}
                        onChange={handleChange}
                        placeholder="Enter email addresses separated by commas"
                        className="block !w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    />
                    <small className="">Enter collaborator email addresses separated by commas</small>
                </div>

                <button type="submit" className="col-span-full block w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Update</button>
            </form>
        </div>
    );
}

export default ProjectUpdate;