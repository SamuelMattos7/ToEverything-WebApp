import React, {useState, useEffect} from "react";
import "../css/TasksList.css";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/task/list/')
          .then(response => {
            
            setTasks(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
    }, []);

    const deleteTask = (id) => {
        if(window.confirm("Are you sure you want to delete this task")){
            axios.delete(`http://127.0.0.1:8000/task/delete/${id}/`)
                .then(() => {
                    setTasks(tasks.filter(task => task.Id !== id))
                })
                .catch(err => {
                    console.error("Error deleting task: ", err);
                    setError(err);
                })
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error : {error.message}</div>

    return (
        <div className="container">
            <a href="tasks/create">Crate a task</a>
            <ul className="tasks">
                {tasks.map(task => (
                    <li key={task.Id}>
                        <div className="task-content">
                            <span className="task-text">{task.task_name}</span> 
                            <span>&nbsp;status:<span className="task-category">{task.task_status}</span></span>
                            <span className="task-category">{task.task_category}</span>
                            <span>Priority:<span className="task-category">{task.label}</span></span>
                        </div>
                        <div className="task-actions">
                            <button className="btn edit-btn"><a href={`tasks/edit/${task.Id}`}>Edit</a></button>
                            <button className="btn edit-btn"><a href={`tasks/details/${task.Id}`}>See details</a></button>
                            <button className="btn delete-btn" onClick={() => deleteTask(task.Id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;