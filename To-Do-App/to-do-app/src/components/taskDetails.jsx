import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

    if (loading) return <div>Loading...</div>;
    if (error) {
        return <div>Error: {error.response ? error.response.data.detail : error.message}</div>;
    }

    return (
        <div>
          <h2>Task Detail</h2>
          <p>Name: {task.task_name}</p>
          <p>Status: {task.task_status}</p>
          <p>Category: {task.task_category}</p>
          <p>Label: {task.label}</p>
        </div>
      );
};

export default TaskDetails;