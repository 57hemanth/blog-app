import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context"
import parser from "html-react-parser"

export default function PostPage() {
    const [post, setPost] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const URL = import.meta.env.VITE_API_URL
    const {userInfo} = useContext(UserContext)

    useEffect(() => {
        fetch(`${URL}/posts/${id}`).then(res => {
            if(res.status === 200){
                res.json().then((data) => {
                    setPost(data)
                })
            }
        })
    }, [])

    if(post == undefined){
        return ""
    }

    return (
        <div className="post-details">
            <h1 className="post-page-title">{post.title}</h1>
            <div className="author-details">
                <p>{new Date(post.createdAt).toLocaleString()}</p>
                <p><span style={{fontWeight: "bold"}}>By </span>{post.author.username}</p>
                {post.author._id == userInfo.id &&
                    <Link className="btn edit-btn" to={`/edit/${post._id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" height={16} width={16}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
 Edit post</Link>}
            </div>
            <div className="post-img-container">
                <img className="featured-image" src={`${URL}/${post.image}`}></img>
            </div>
            <div className="content">
                <p>{parser(post.content)}</p>
            </div>
        </div>
    )
}