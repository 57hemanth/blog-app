import { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"

function clearInputs() {
    setUsername("")
    setPassword("")
}

export default function SignupPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [navigate, setNavigate] = useState(false)
    const usernameRef = useRef()

    const URL = `${import.meta.env.VITE_API_URL}/register`;

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    function handleRegister(e) {
        e.preventDefault()
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        }).then(res => {
            if(res.status === 200){
                alert("Registration successfull")
                clearInputs()
                setNavigate(true)
            } else {
                alert("Registration failed!")
                clearInputs()
            }
        })
    }

    if(navigate){
        return <Navigate to={"/login"}  />
    }

    return(
        <div className="auth-container">
        <h1 className="auth-name">Sign Up</h1>
        <form className="form" onSubmit={handleRegister}>
            <input type="text" placeholder="Username" ref={usernameRef} value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button className="btn" type="submit">Register</button>
        </form>
        </div>
    )
}