import React, {useState, useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
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
                <div>
                    <label>Project:</label>
                    <input 
                        type="text" 
                        name="tasks_project" 
                        value={task.tasks_project || ''} 
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="task_name" 
                        value={task.task_name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <br />
                <div>
                    <label>Status:</label>
                    <select 
                        name="task_status" 
                        value={task.task_status} 
                        onChange={handleChange}
                        required
                    >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <br />
                <div>
                    <label>Description:</label>
                    <textarea 
                        name="description" 
                        value={task.description} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <br />
                <div>
                    <label>Category:</label>
                    <select 
                        name="task_category" 
                        value={task.task_category || ''} 
                        onChange={handleChange}
                    >
                        <option value="">Select a Category</option>
                        {categories.map(category => (
                            <option 
                                key={category.id} 
                                value={category.id}
                            >
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div>
                    <label>Label:</label>
                    <select 
                        name="label" 
                        value={task.label} 
                        onChange={handleChange}
                        required
                    >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </div>
                <br />
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;