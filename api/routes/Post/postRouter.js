import express from "express"
import multer from "multer"
const upload = multer({ dest: 'uploads/' })
import { allPosts, createPost, editPostById, getPostById } from "../../controllers/Post/postCtrl.js"

const postRouter = express.Router()

postRouter.post("/create", upload.single('image'), createPost)
postRouter.get("/", allPosts)
postRouter.get("/:id", getPostById)
postRouter.put("/:id", upload.single('image'), editPostById)

export default postRouter