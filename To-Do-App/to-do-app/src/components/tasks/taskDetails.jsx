import React, {useState, useEffect} from "react";
import {Calendar, Clock, AlertTriangle, CheckCircle} from 'lucide-react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav";

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/task/details/${id}/`)
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
                setLoading(false);
            });

    }, [id]);

    const priorityColors = {
        LOW:'bg-blue-100 text-blue-800',
        MEDIUM:'bg-yellow-100 text-yellow-800',
        HIGH:'bg-red-100 text-red-800'
    }

    const statusColors = {
        "Not started":"bg-gray-100 text-gray-800",
        "In progress": "bg-purple-100 text-purple-800",
        "Completed": "bg-green-100 text-green-800"
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'});
    }

    if (loading) return <div>Loading...</div>;
    if (error) {
        return <div>Error: {error.response ? error.response.data.detail : error.message}</div>;
    }

   
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 bg-opacity-80 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className={`h-2 w-full ${task.label === "HIGH" ? "bg-red-500" : task.label === "MEDIUM" ? "bg-yellow-500" : "bg-blue-500"}`}></div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 flex-grow">{task.task_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.task_status]}`}>
                                {task.task_status}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                                <Calendar size={16} className="mr-2 text-gray-500" />
                                <div>
                                <p className="text-xs text-gray-500">Start Date</p>
                                <p className="text-sm font-medium">{formatDate(task.start_date)}</p>
                                </div>
                            </div>
                        <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-gray-500" />
                            <div>
                            <p className="text-xs text-gray-500">Due Date</p>
                            <p className="text-sm font-medium">{formatDate(task.end_date)}</p>
                            </div>
                        </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <AlertTriangle size={16} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Priority</p>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium lowercase ${priorityColors[task.label]}`}>
                                        {task.label}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium mr-2">
                                    
                                </div>
                                <p className="text-sm">{task.username}</p>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Description</p>
                            <p className="text-sm text-gray-700">{task.description}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            
                        </div>
                        <div className=" flex justify-end ">
                            <button className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-full"><a href="/tasks">Go back</a></button>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
        
    );
   
};

export default TaskDetails;