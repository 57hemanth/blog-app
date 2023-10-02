import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../context";

export default function NavBar() {

    const {userInfo, setUserInfo} = useContext(UserContext)

    const navigate = useNavigate()

    const URL = import.meta.env.VITE_API_URL;

    async function logout() {
        await fetch(`${URL}/logout`, {
            credentials: "include",
            method: "POST"
        })
        setUserInfo({})
        navigate("/")
    }

    return(
        <nav>
            <Link to="/" className="logo">MyBlog</Link>
            { userInfo.username ? 
            <div className="menu">
                <Link to="/create">New Post</Link>
                <Link onClick={logout}>Logout</Link>
            </div> : 
            <div className="menu">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div> }
        </nav>
    )
}