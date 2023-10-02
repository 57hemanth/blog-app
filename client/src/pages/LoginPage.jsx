import { useContext, useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context"

export default function LoginPage() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const usernameRef = useRef()
    const [redirect, setRedirect] = useState(false)
    const { setUserInfo } = useContext(UserContext)

    const URL = `${import.meta.env.VITE_API_URL}/login`;

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    function clearInputs() {
        setUsername("")
        setPassword("")
        usernameRef.current.focus()
    }

    function handleLogin(e) {
        e.preventDefault()
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        }).then(res => {
            if(res.status == 200){
                res.json().then(data => {
                    setUserInfo(data.data)
                })
                setRedirect(true)
                clearInputs()
            } else {
                console.log(res.json().then(resData => resData.then(data => data)))
                alert("Credentials incorrect")
                clearInputs()
            }
        })
    }

    if(redirect){
        return <Navigate to={"/"} />
    }

    return(
        <div className="auth-container">
        <h1 className="auth-name">Login</h1>
        <form className="form" onSubmit={handleLogin}>
            <input type="text" placeholder="Username" ref={usernameRef} value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button className="btn" type="submit">Login</button>
        </form>
        </div>
    )
}