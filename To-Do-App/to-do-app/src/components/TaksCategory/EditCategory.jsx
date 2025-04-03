import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryUpdate = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [category, setCategory] =  useState({
        project:"",
        category_name:"",
    });

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try{
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/projects/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProjects(response.data);
            }
            catch(error){
                console.error("Error fetching projects: ", error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`http://127.0.0.1:8000/task/categories/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategory(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching category: ", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.getItem('accessToken');
        axios.put(`http://127.0.0.1:8000/task/category/update/${id}/`, category, 
            {headers: {Authorization:`Bearer ${localStorage.getItem("accessToken")}` }})
        .then(response => {
            console.log(response.data);
            setSuccess(true);
            setTimeout(() => {
                navigate('/categories');
            }, 2000);
        })
        .catch(err => {
            console.log("Failed to update category", err);
            setError(err);
        })
    }

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <div className="text-center p-5 text-red-500">Error: {error.message}</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Category</h2>
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Category updated successfully! Redirecting...
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="project" className="block text-gray-700 text-sm font-bold mb-2">
                        Project
                    </label>
                    <select
                        id="project"
                        name="project"
                        value={category.project}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.project_name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-6">
                    <label htmlFor="category_name" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="category_name"
                        name="category_name"
                        value={category.category_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Category Name"
                        required
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Category
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/tasks')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryUpdate;