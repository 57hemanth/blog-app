import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import ReactQill from "react-quill"
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

export default function EditPost() {

    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState("")
    const [redirect, setRedirect] = useState(false)

    const URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${URL}/posts/${id}`).then(res => {
            if(res.status == 200){
                res.json().then(data => {
                    setTitle(data.title)
                    setDescription(data.description)
                    setContent(data.content)
                })
            }
        })
    }, [])

    function editPost(e) {
        e.preventDefault()
        const data = new FormData()
        data.set("title", title)
        data.set("description", description)
        data.set("image", files[0])
        data.set("content", content)

        fetch(`${URL}/posts/${id}`, {
            method: "PUT",
            body: data,
            credentials: "include"
        }).then((res) => {
            if(res.status == 200){
                res.json().then(data => {
                    setRedirect(true)
                })
            }
        })
    }

    if(redirect) {
        return <Navigate to={"/"} />
    }

    return(
        <div className="create-post">
            <h2>Edit Post</h2>
            <form className="form" onSubmit={editPost}>
                <input type="text" className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <input type="file" onChange={(e) => setFiles(e.target.files)}></input>
                <ReactQill theme="snow" modules={modules} formats={formats} value={content} onChange={setContent} ></ReactQill>
                <button className="btn">Edit</button>
            </form>
        </div>
    )
}