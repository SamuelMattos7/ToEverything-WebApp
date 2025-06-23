import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCategory = () => {

    const navigate = useNavigate();

    const [project, setProject] = useState([])
    const [category, setCategory] = useState({
        project:"",
        category_name:"",
    })

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/projects/list/', 
                    {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}
                )
                setProject(response.data);
            } catch (error) {
                console.error("error while fetching projects: ", error);
                setError(error);
            }
        };
        fetchProjects();
    }, []);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const amount = project;

    const handleChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("AccessToken: ", localStorage.getItem("AccessToken"));
        axios.post('http://127.0.0.1:8000/task/category/create/', category, {
            headers: {Authorization:`Bearer ${localStorage.getItem("accessToken")}` }}
        )
        .then(response => {
            console.log("Category created: ", response.data);
            setSuccess(true);
            setTimeout(() => {
                navigate("/categories");
            }, 2000);
        })
        .catch(err => {
             console.log('Error while creating task: ', err);
             setError(err.response?.data || "Unknown error");
         });
    };

    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 p-4 bg-opacity-80">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-4 w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white rounded-xl" onSubmit={handleSubmit}>
                <div><h2 className=" font-bold text-xl font-sans">Create task</h2></div>
                
                <div className="col-span-full">
                    <label htmlFor="project" className="block mb-2 text-sm font-medium">Project</label>
                    <select
                        id="project"
                        name="project"
                        value={category.project || ''}
                        onChange={handleChange}
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a Project</option>
                        {project.length > 0 &&
                            project.map(p => (
                                <option key={p.projectId} value={p.projectId}>
                                    {p.project_name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                
                <div className="col-span-full">
                    <label htmlFor="category_name" className="block mb-2 text-sm font-medium">Name</label>
                    <input 
                        id="category_name"
                        name="category_name"
                        type="text" 
                        value={category.category_name}
                        onChange={handleChange}
                        className="block !w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    />
                </div>
                <button type="submit" className="col-span-full block w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Submit</button>
            </form>
        </div>
    );
}

export default CreateCategory;


