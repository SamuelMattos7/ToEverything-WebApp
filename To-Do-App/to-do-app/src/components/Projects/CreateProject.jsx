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
        <div className="bg-gradient-to-b from-slate-200 to-slate-300 bg-opacity-80 p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-4 w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white rounded-xl">
                <div><h2 className=" font-bold text-xl font-sans">Create Project</h2></div>
                <div className="col-span-full">
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input 
                        type="text" 
                        name="project_name" 
                        value={formData.project_name} 
                        onChange={handleChange}
                        className="block !w-full p-2.5 bg-gray-50 border-gray-300 rounded-lg outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none" 
                    />
                </div>

                <div className="col-span-full">
                    <label className="block mb-2 text-sm font-medium">Description</label>
                    <textarea 
                        type="text" 
                        name="project_description" 
                        value={formData.project_description} 
                        onChange={handleChange} required 
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="project_startDate" className="block mb-2 text-sm font-medium">Start date</label>
                        <input
                            type="date"
                            id="project_startDate"
                            name="project_startDate"
                            value={formData.project_startDate}
                            onChange={handleChange}
                            className="border w-66 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="project_endDate" className="text-sm text-gray-600 mb-1">End date</label>
                        <input
                            type="date"
                            id="project_endDate"
                            name="project_endDate"
                            value={formData.project_endDate}
                            onChange={handleChange}
                            className="border w-66 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="col-span-full flex flex-col gap-2">
                    <label htmlFor="collaborator_emails" className="text-sm text-gray-700 font-medium">Collaborators</label>
                    <input
                        type="text"
                        id="collaborator_emails"
                        name="collaborator_emails"
                        value={formData.collaborator_emails}
                        onChange={handleChange}
                        placeholder="Enter email addresses separated by commas"
                        className=" !w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <small className="text-xs text-gray-500">Enter collaborator email addresses separated by commas</small>
                </div>
                <button type="submit" className="col-span-full block w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Submit</button>
            </form>
        </div>
    );
}

export default CreateProject;