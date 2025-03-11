import "../css/Nav.css"; 

function Nav() {
    return (
        <div className="navbar">
            <nav>
                <h4 className="Company_name">To Everything</h4>
                <div className="navbarList">
                    <ul>
                        <li className="navElements"><a href="/register">Register</a></li>
                        <li className="navElements"><a href="/prices">Get in contact</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Nav;