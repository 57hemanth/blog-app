import { useEffect, useState } from "react";
import Post from "../components/Post";
import ta from "time-ago"
import { Link } from "react-router-dom"

export default function HomePage() {

    const [posts, setPosts] = useState([])
    const URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${URL}/posts`).then(res => res.json().then(data => 
            setPosts(data)
        ))
    }, [])

    return(
        <div className="posts">
            {posts.length > 0 && posts.map(post => {
                const {title, description, author, createdAt, image} = post
                const uploaded = ta.ago(new Date(createdAt))
                const data = { title, description, author: author.username, date: uploaded, image}
                return <Link to={"/post/"+post._id} key={post._id}><Post {...data} /></Link>
            })}
        </div>
    )
}