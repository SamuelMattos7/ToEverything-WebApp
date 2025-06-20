import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Folder, Plus } from 'lucide-react';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/task/categories-list/", 
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
        if(window.confirm("Are you sure you want to delete this category?")){
            axios.delete(`http://127.0.0.1:8000/task/category/delete/${id}/`)
                .then(() => {
                    setCategories(categories.filter(category => category.id !== id))
                })
                .catch(err => {
                    console.error("Error deleting category: ", err);
                    setError(err.response?.data?.message);
                })
            setCategories(categories.filter(category => category.id !== id));
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-64">
            <div className="text-gray-500">Loading categories...</div>
        </div>
    );
    
    if (error) return (
        <div className="flex justify-center items-center min-h-64">
            <div className="text-red-500">Error: {error.message}</div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Categories</h1>
                        <p className="text-gray-600">Organize your tasks with custom categories</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <Plus size={20} />
                        <a href="/category/create-category">Add Category</a>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Categories</p>
                                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Folder className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Active</p>
                                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Folder className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Most Used</p>
                                <p className="text-2xl font-bold text-gray-900">Development</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Folder className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Recent</p>
                                <p className="text-2xl font-bold text-gray-900">Testing</p>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <Folder className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">All Categories</h2>
                    </div>
                    
                    {categories.length === 0 ? (
                        <div className="p-12 text-center">
                            <Folder className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                            <p className="text-gray-600 mb-6">Create your first category to get started organizing your tasks.</p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors">
                                <Plus size={16} />
                                Create Category
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {categories.map((category, index) => (
                                <div key={category.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${
                                                index % 4 === 0 ? 'bg-blue-100' :
                                                index % 4 === 1 ? 'bg-green-100' :
                                                index % 4 === 2 ? 'bg-purple-100' : 'bg-orange-100'
                                            }`}>
                                                <Folder className={`${
                                                    index % 4 === 0 ? 'text-blue-600' :
                                                    index % 4 === 1 ? 'text-green-600' :
                                                    index % 4 === 2 ? 'text-purple-600' : 'text-orange-600'
                                                }`} size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">{category.category_name}</h3>
                                                <p className="text-gray-600 text-sm">Created recently</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {category.task_count || 0} tasks
                                            </span>
                                            <button 
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                onClick={() => window.location.href = `category/update/${category.id}`}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={() => deleteCategory(category.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryList;