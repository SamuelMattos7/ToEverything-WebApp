import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CreateTask = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [project, setProject] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [task, setTask] = useState({
        tasks_project:"",
        task_name:"",
        task_status:"NOT_STARTED",
        task_category:"",
        description:"",
        label:"HIGH",
        end_date:"",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/task/categories/', {
                    headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
                });
                setCategory(response.data);
            }catch(err){
                console.error("Error detected: ", err);
                setError(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/projects/list/', {
                    headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
                });
                setProject(response.data);
            }catch(error){
                console.error("error while fetching projects: ", error);
                setError(error);
            }
        };
        fetchProjects();
    }, []);

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
        <div className=" min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 bg-opacity-80 p-4">            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-4 w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white rounded-xl">
                <div><h2 className=" font-bold text-xl font-sans">Create task</h2></div>
                <div className="col-span-full">
                
                    <div className="mb-4">
                        <label htmlFor="task_name" className="block mb-2 text-sm font-medium">Name</label>
                        <input 
                            type="text" 
                            name="task_name" 
                            value={task.task_name} 
                            onChange={handleChange} 
                            required 
                            className="block !w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="task_status" className="block mb-2 text-sm font-medium">Status</label>
                            <select
                                name="task_status"
                                value={task.task_status}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="Not started">Not Started</option>
                                <option value="In progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="label" className="block mb-2 text-sm font-medium">Label</label>
                            <select
                                name="label"
                                value={task.label}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="task_category" className="block mb-2 text-sm font-medium">Category</label>
                    <select 
                        type="text" 
                        name="task_category" 
                        value={task.task_category} 
                        onChange={handleChange}
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a category</option>
                        {category.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="tasks_project" className="block mb-2 text-sm font-medium">Project</label>
                    <select 
                        type="text"
                        name="tasks_project" 
                        value={task.tasks_project}
                        onChange={handleChange}
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"                    
                    >
                        <option value="">Select a project</option>
                        {project.map(p => (
                            <option key={p.projectId} value={p.projectId}>{p.project_name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-full">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        rows={4}
                        value={task.description} 
                        onChange={handleChange} 
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your task…"
                        required
                    />
                </div>

                <div className="flex justify-between gap-x-4">
                    <div>
                        <label htmlFor="start_date" className="block mb-2 text-sm font-medium">Start date</label>
                        <input 
                            type="date" 
                            name="Start_date" 
                            value={task.start_date} 
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
                            value={task.end_date} 
                            onChange={handleChange} 
                            className="block w-66 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="col-span-full block w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Submit</button>
            </form>
        </div>
    );
}

export default CreateTask;