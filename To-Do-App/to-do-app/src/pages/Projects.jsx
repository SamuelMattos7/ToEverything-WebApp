import React from "react";
import Nav from "../components/Nav.jsx";
import ProjectsList from "../components/Projects/ProjectList.jsx";

export default function ProjectsPage () {
    return(
        <div>
            <header>
                <Nav></Nav>
            </header>
            <ProjectsList/>
        </div>
    );
}