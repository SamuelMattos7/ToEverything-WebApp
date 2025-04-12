import React, {useState, useEffect} from "react";
import axios from "axios"

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/task/categories/", 
            {headers: {Authorization:`Bearer ${localStorage.getItem("accessToken")}` }}
        )
        .then(response => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError(err.response?.data || "Unknown error");
        })
    }, []);

    const deleteCategory = (id) => {
        if(window.confirm("Are you sure you want to delete this category")){
            axios.delete(`http://127.0.0.1:8000/task/category/delete/${id}/`)
                .then(() => {
                    setCategories(categories.filter(category => category.id !== id))
                })
                .catch(err => {
                    console.error("Error deleting task: ", err);
                    setError(err.response?.data?.message);
                })
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error : {error.message}</div>

    return(
        <ul className="categories">
                {categories.map(category => (
                    <li key={category.id}>
                        <div className="category-content">
                            <span className="task-text">{category.category_name}</span> 
                        </div>
                        <div className="category-actions">
                            <button className="btn edit-btn"><a href={`category/update/${category.id}`}>Edit</a></button>
                            <button className="btn delete-btn" onClick={() => deleteCategory(category.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
    );
}



export default CategoryList;