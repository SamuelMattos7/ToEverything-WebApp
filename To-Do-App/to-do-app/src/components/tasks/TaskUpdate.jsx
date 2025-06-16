import React, {useState, useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [projects, setProjects] = useState([]);
    const [task, setTask] = useState({
        tasks_project:"",
        task_name:"",
        task_status:"NOT_STARTED",
        task_category:"",
        description:"",
        label:"HIGH",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                const response = await axios.get('http://127.0.0.1:8000/task/categories/', {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setCategories(response.data);
            } catch(error) {
                console.error('Error fetching categories: ', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/projects/list/', {
                    headers: {'Authorization':`Bearer ${token}`}
                });
                setProjects(response.data);
            }catch(error){
                console.error('Error fetching projects: ', error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/task/details/${id}/`)
            .then(response => {
                setTask(response.data);
                console.log(response.data)
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
        <div className=" bg-gradient-to-b from-slate-200 to-slate-300 bg-opacity-80 p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-4 w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white rounded-xl">
                <div><h2 className=" font-bold text-xl font-sans">Update Task</h2></div>
                <div className="col-span-full">
                    <label htmlFor="task_name" className="block mb-2 text-sm font-medium">Name</label>
                    <input
                        id="task_name"
                        name="task_name"
                        type="text"
                        value={task.task_name}
                        onChange={handleChange}
                        required
                        className="block !w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    />
                </div>

                <div>
                    <label htmlFor="tasks_project" className="block mb-2 text-sm font-medium">Project</label>
                    <select
                        id="tasks_project"
                        name="tasks_project"
                        value={task.tasks_project || ''}
                        onChange={handleChange}
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a Project</option>
                        {projects.map(p => (
                            <option key={p.projectId} value={p.projectId}>
                            {p.project_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="task_status" className="block mb-2 text-sm font-medium">Status</label>
                    <select
                        id="task_status"
                        name="task_status"
                        value={task.task_status}
                        onChange={handleChange}
                        required
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Not started">Not Started</option>
                        <option value="In progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="col-span-full">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={task.description}
                        onChange={handleChange}
                        required
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your task…"
                    />
                </div>

                <div>
                    <label htmlFor="task_category" className="block mb-2 text-sm font-medium">Category</label>
                    {categories.length > 0 ? (
                        <select
                            id="task_category"
                            name="task_category"
                            value={task.task_category || ''}
                            onChange={handleChange}
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <option value="">Select a Category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.category_name}
                                </option>
                            ))}
                        </select>
                    ): (
                        <p>Loading categories... </p>
                    )}
                </div>

                <div>
                    <label htmlFor="label" className="block mb-2 text-sm font-medium">Label</label>
                    <select
                        id="label"
                        name="label"
                        value={task.label}
                        onChange={handleChange}
                        required
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </div>
                <button type="submit" className="col-span-full block w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Submit</button>
            </form>
        </div>
    );
};

export default UpdateTask;