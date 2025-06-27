import {useState, useEffect} from "react";
import { Calendar, Clock } from "lucide-react";
import axios from "axios"

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [projectDetails, setProjectDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState({});
    const [error, setError] = useState(null);
    const [expandedProject, setExpandedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/projects/list/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data = await response.json();
                setProjects(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(err.message || "Unknown error");
                setLoading(false);
            }
        };
        
        fetchProjects();
    }, []);

    const fetchProjectDetails = async (projectId) => {
        if (projectDetails[projectId]) return; 
        
        setDetailsLoading(prev => ({...prev, [projectId]: true}));
        
        try {
            const response = await fetch(`http://127.0.0.1:8000/projects/details/${projectId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            //console.log(`Project details for ${projectId}:`, data);
            
            setProjectDetails(prev => ({
                ...prev,
                [projectId]: data
            }));
        } catch (err) {
            console.log(`Error fetching details for project ${projectId}:`, err);
        } finally {
            setDetailsLoading(prev => ({...prev, [projectId]: false}));
        }
    };

    const toggleProjectExpand = (projectId) => {
        if (expandedProject === projectId) {
            setExpandedProject(null);
        } else {
            setExpandedProject(projectId);
            fetchProjectDetails(projectId);
        }
    };

    const deleteProject = async (id) => {
        if(window.confirm('Are you sure you want to delete this project, if you do all related categories and task to it will also be deleted')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/projects/delete/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                setProjects(projects.filter(project => project.projectId !== id));
                
                if (projectDetails[id]) {
                    const newDetails = {...projectDetails};
                    delete newDetails[id];
                    setProjectDetails(newDetails);
                }
            } catch (err) {
                console.log('Error deleting project', err);
                setError(err.message);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'});
    };

    if (loading) return <div className="text-center p-8">Loading projects...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <a 
                    href="/projects/create" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                    Create Project
                </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div 
                        key={project.projectId} 
                        className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900">
                                    {project.project_name}
                                </h5>
                                <button 
                                    onClick={() => toggleProjectExpand(project.projectId)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2"
                                >
                                    {expandedProject === project.projectId ? "Hide Details" : "View Details"}
                                </button>
                            </div>
                            
                            {expandedProject === project.projectId && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    {detailsLoading[project.projectId] ? (
                                        <div className="text-center py-2">Loading details...</div>
                                    ) : projectDetails[project.projectId] ? (
                                        <div className="space-y-4">
                                            {projectDetails[project.projectId].creator && (
                                                <div className="flex items-center">
                                                    <User size={16} className="mr-2 text-gray-600"/>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Created by</p>
                                                        <p className="text-sm font-medium">
                                                            {projectDetails[project.projectId].creator}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Description</p>
                                                <p className="text-sm text-gray-700">
                                                    {projectDetails[project.projectId].project_description || project.project_description}
                                                </p>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <Calendar size={16} className="mr-2 text-gray-600"/>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Start Date</p>
                                                        <p className="text-sm font-medium">
                                                            {formatDate(projectDetails[project.projectId].project_startDate || project.project_startDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock size={16} className="mr-2 text-gray-600"/>
                                                    <div>
                                                        <p className="text-xs text-gray-500">End Date</p>
                                                        <p className="text-sm font-medium">
                                                            {formatDate(projectDetails[project.projectId].project_endDate || project.project_endDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-3 pt-2">
                                                <a 
                                                    href={`/projects/update/${project.projectId}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Edit
                                                </a>
                                                <button 
                                                    onClick={() => deleteProject(project.projectId)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                                <a 
                                                    href={`/project/details/${project.projectId}`}
                                                    className="text-purple-600 hover:text-purple-800 text-sm font-medium ml-auto"
                                                >
                                                    Full Details
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-2">Could not load project details</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {projects.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No projects found. Create your first project to get started.
                </div>
            )}
        </div>
    );
};

export default ProjectsList;