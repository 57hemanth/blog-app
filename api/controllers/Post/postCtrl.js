import fs from "fs"
import Post from "../../models/Post/PostModel.js"
import jwt from "jsonwebtoken"

const createPost = async (req, res) => {
    const {destination, originalname, path} = req.file
    const {title, description, content} = req.body
    const newPath = destination+originalname
    const { token } = req.cookies
    try {
        fs.renameSync(path, newPath)
        if(token){
            const data = jwt.verify(token, process.env.JWT_SECRET)
            const newPost = await Post.create({ title, description, content, image: newPath, author: data.id })
            res.send({ message: "Post created" })
        } else {
            res.status(400).send({ message: "Creation failed" })
        }
        
    } catch (error) {
        res.send({ message: error.message })
    }
}

const allPosts = async (req, res) => {
    try {
        const allPosts = await Post.find().populate("author", ["username"]).sort({ createdAt: -1 })
        res.send(allPosts)
    } catch (error) {
        res.send({ message: error.message })
    }
}

const getPostById = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id).populate("author", ["username"])
        if(post) {
            res.send(post)
        } else {
            res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        res.send({ message: error.message })
    }
}

const editPostById = async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies
    const {title, description, content} = req.body
    const newPath = req.file?.destination+req.file?.originalname
    try {
        const post = await Post.findById(id)
        if(post) {
            const userInfo = jwt.verify(token, process.env.JWT_SECRET)
            if(userInfo){
                if(post.author._id == userInfo.id){
                    const update = await Post.findByIdAndUpdate(id, {title, description, content, image: newPath ? newPath : post.image}, { new: true })
                    res.send({ message: "Post updated" })
                } else {
                    res.status(400).send({ message: "You are not authorized"})
                }
            } else {
                res.status(400).send({ message: "Please login first"})
            }
        } else {
            res.status(400).send({ message: "Post not found"})
        }
    } catch (error) {
        res.send({ message: error.message })
    }
}

export { createPost, allPosts, getPostById, editPostById }