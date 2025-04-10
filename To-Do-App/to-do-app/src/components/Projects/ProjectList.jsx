import React, {useState, useEffect} from "react";
import axios from "axios"

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/projects/list/', 
            {headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}` }}
        )
        .then(response => {
            console.log(response.data);
            setProjects(response.data);
            setLoading(false);
        })
        .catch(err =>{
            console.log(err);
            setError(err.response?.data || "Unknown error");
        })
    }, []);

    const deleteProject = (id) => {
        if(window.confirm('Are you sure you want to delete this project')){
            axios.delete(`http://127.0.0.1:8000/projects/delete/${id}/`)
                .then(() => {
                    setProjects(projects.filter(project => project.projectId !== id))
                })
                .catch(err => {
                    console.log('error deleting project', err);
                    setError(err.response?.data?.message);
                })
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    
    return (
        <div>
            <ul className="projects-list">
                {projects.map(project => {
                    return (
                    <li key={project.projectId}>
                        <div className="project-content">
                        <span className="project-name">{project.project_name}</span>
                        </div>
                        <div className="project-actions">
                        <button>
                            <a href={`projects/update/${project.projectId}`}>Edit</a>
                        </button>
                        <button onClick={() => deleteProject(project.projectId)}>Delete</button>
                        </div>
                    </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProjectsList;