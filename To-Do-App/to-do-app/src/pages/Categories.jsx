import React from "react";
import Nav from "../components/Nav.jsx";
import CategoryList from "../components/TaksCategory/CategoryList.jsx";

function CategoriesPage() {
    
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <CategoryList/>
        </div>
    );
}

export default CategoriesPage;