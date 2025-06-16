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
        <nav className=" bg-blue-400 shadow-lg">
            <div className="mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex">
                        <div>
                            <a href="#" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-white text-lg">ToEverything</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="flex ">
                            <a href="/" className="py-4 px-2 text-white">Home</a>
                            {isLoggedIn ? (
                                <div className="flex">
                                    <a className="py-4 px-2 text-white" onClick={handleLogout}>Logout</a> 
                                    <a className="py-4 px-2 text-white" href="/calendar">Calendar</a>
                                </div>
                            ):(
                                <a className="py-4 px-2 text-white" href="/login">Login</a>
                            )}
                            <a className="py-4 px-2 text-white" href="#">About</a>
                            <a className="py-4 px-2 text-white" href="#" >Contact us</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;