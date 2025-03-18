import "../css/Nav.css"; 
import { useState,useEffect } from "react";
import axios from "axios";

function Nav() {

    const [username, setUsernme] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect (() =>{
        const checkLoggedUser = async () => {
            try{
                const token = localStorage.getItem("accessToken");
                if(token){
                    const config = {
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/user/", config)
                    setLoggedIn(true)
                    setUsernme(response.data.username)
                }
                else{
                    setLoggedIn(false);
                    setUsernme("");
                }
            }
            catch{
                setLoggedIn(false);
                setUsernme("");
            }
        };
        checkLoggedUser()
    }, [])

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            if(accessToken && refreshToken){
                const config = {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`, 
                        "Content-Type": "application/json"
                    }
                };
                
                await axios.post("http://127.0.0.1:8000/api/logout/", {'refresh':refreshToken}, config);
                
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setLoggedIn(false);
                setUsernme("")
            }
        }
        catch(error){
            console.log("Failed to logout", error);
        }
    }

    return (
        <div className="navbar">
            <nav>
                <h4 className="Company_name">ToEverything</h4>
                <div className="navbarList">
                    <ul>
                        <li className="navElements"><a href="/">Home</a></li>
                        {isLoggedIn ? (
                            <li className="navElements"><a onClick={handleLogout}>Logout</a></li>
                        ):(
                            <li className="navElements"><a href="/login">Login</a></li>
                        )
                        }
                        <li className="navElements"><a href="/register">Register</a></li>
                        <li className="navElements"><a href="/prices">Get in contact</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Nav;