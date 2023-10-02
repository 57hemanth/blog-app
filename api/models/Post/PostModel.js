import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: (true, "Title is required")
    },
    description: {
        type: String,
        required: (true, "Description is required")
    },
    image: {
        type: String, 
        required: (true, "Cover image is required")
    },
    content: {
        type: String,
        required: (true, "Content is required")
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: (true, "User details is required")
    }
}, {
    timestamps: true
})

const Post = new mongoose.model("Post", postSchema)

export default Post