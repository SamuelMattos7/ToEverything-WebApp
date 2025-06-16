import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Calendar } from "lucide-react";
import axios from "axios";


const ProjectDetails = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/projects/details/${id}/`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(response => {
            setDetails(response.data);
            setLoading(false)
        })
        .catch(err => {
            console.error(err || 'Unknown error while fetching project details');
            setError(err);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) {
        return <div>Error: {error.response ? error.response.data.detail : error.message}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'});
    }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 bg-opacity-80 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 flex-grow">{details.project_name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                                <Calendar size={16} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Start Date</p>
                                    <p className="text-sm font-medium">{formatDate(details.project_startDate)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Due Date</p>
                                    <p className="text-sm font-medium">{formatDate(details.project_endDate)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1">Description</p>
                            <p className="text-sm text-gray-700">{details.project_description}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <div className="mt-2">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Collaborators</h4>
                                <div className="flex flex-wrap gap-1">
                                    {details.users.map(collaborator => (
                                    <span key={collaborator.id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                        {collaborator.email}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className=" flex justify-end ">
                            <button className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-full"><a href="/projects">Go back</a></button>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ProjectDetails;