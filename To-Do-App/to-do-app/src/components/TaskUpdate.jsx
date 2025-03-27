import React, {useState, useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        task_project:"",
        task_name:"",
        task_status:"",
        task_category:"",
        description:"",
        label:"",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/task/details/${id}/`)
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            })
    }, [id]);

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/task/update/${id}/`, task)
            .then(response => {
                console.log("Task was updated: ", response.data);
                setSuccess(true);
                setTimeout(() => {
                    navigate("/tasks"); 
                }, 2000);
            })
            .catch(err => {
                console.error("Error updating task:", err);
                setError(err);
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Edit Task</h2>
            {success && <p style={{ color: "green" }}>Task updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Project:
                    <input type="text" name="task_project" value={task.task_project} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" name="task_name" value={task.task_name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Status:
                    <input type="text" name="task_status" value={task.task_status} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name="task_name" value={task.description} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Category:
                    <input type="text" name="task_category" value={task.task_category} onChange={handleChange}  />
                </label>
                <br />
                <label>
                    Label:
                    <input type="text" name="label" value={task.label} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;