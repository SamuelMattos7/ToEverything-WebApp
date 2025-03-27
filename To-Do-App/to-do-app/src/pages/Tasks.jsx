import React from "react";
import Nav from "../components/Nav.jsx";
import TaskList from "../components/taskList.jsx";

function TasksPage() {
    
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <TaskList/>
        </div>
    );
}

export default TasksPage;