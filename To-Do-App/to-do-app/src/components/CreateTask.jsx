import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CreateTask = () => {

    const navigate = useNavigate();
    
    const [task, setTask] = useState({
        tasks_project:"",
        task_name:"",
        task_status:"NOT_STARTED",
        task_category:"",
        description:"",
        label:"HIGH",
        end_date:"",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Access Token:", localStorage.getItem("accessToken"));
        axios.post(`http://127.0.0.1:8000/task/create/`, task, 
            {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }})
            .then(response => {
                console.log('Task was created: ', response.data);
                setSuccess(true);
                setTimeout(() => {
                   navigate("/tasks");
                }, 2000);
            })
            .catch(err => {
                console.log('Error while creating task: ', err);
                setError(err.response?.data || "Unknown error");
            });
    };

    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h2>Create Task</h2>
            {success && <p style={{ color: "green" }}>Task created successfully!</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Project:
                    <input type="text" name="tasks_project" value={task.tasks_project} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" name="task_name" value={task.task_name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Status:
                    <select name="task_status" value={task.task_status} onChange={handleChange} required>
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name="description" value={task.description} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Category:
                    <input type="text" name="task_category" value={task.task_category} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Label:
                    <select name="label" value={task.label} onChange={handleChange} required>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </label>
                <br />
                <label>
                    End date:
                    <input type="date" name="end_date" value={task.end_date} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default CreateTask;