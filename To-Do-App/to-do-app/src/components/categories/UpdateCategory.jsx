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
                console.log(response.data);
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
                const response = await axios.get(`http://127.0.0.1:8000/task/category-details/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategory(response.data);
                console.log(response.data);
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

    if (loading) return <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center"><div className="text-center p-5">Loading...</div></div>;
    if (error) return <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center"><div className="text-center p-5 text-red-500">Error: {error.message}</div></div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 w-full max-w-md bg-white rounded-xl shadow-lg">
                <div>
                    <h2 className="font-bold text-xl font-sans">Update {category.category_name}</h2>
                </div>
                <div> 
                    <label htmlFor="category_name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="category_name"
                        name="category_name"
                        value={category.category_name}
                        onChange={handleChange}
                        className="block !w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        placeholder={category.category_name}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="project" className="block mb-2 text-sm font-medium">Project</label>
                    <select
                        id="project"
                        name="project"
                        value={category.project || ''}
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
                <button type="submit" className="block w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Submit</button>
            </form>
        </div>
    );
};

export default CategoryUpdate;