import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

    return (
        <div>
            <h2>Task Detail</h2>
            <p>Name: {details.project_name}</p>
            <p>description: {details.project_description}</p>
            <p>Start date: {details.project_startDate}</p>
            <p>End date: {details.project_endDate}</p>
            <p>
                {details.users.map(collaborator => {
                    return(
                        <li key={collaborator.id}>
                            <small>{collaborator.email}</small>
                        </li>
                    )
                })}
            </p>
        </div>
    );

}
export default ProjectDetails;