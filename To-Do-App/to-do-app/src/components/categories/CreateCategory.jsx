import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCategory = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState({
        project:"",
        category_name:"",
    })

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

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
                    <input type="text" name="project" value={category.project} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" name="category_name" value={category.category_name} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Create category</button>
            </form>
        </div>
    );
}

export default CreateCategory;


