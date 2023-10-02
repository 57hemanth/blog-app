import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dbConnect from "./config/dbConnect.js"
import dotenv from "dotenv"
import userRouter from "./routes/User/userRouter.js"
import cookieParser from "cookie-parser"
import postRouter from "./routes/Post/PostRouter.js"
import path from "path"

const app = express()
dotenv.config()
app.use(cors({
    credentials: true, origin: "http://localhost:5173"
}))
app.use(cookieParser())
app.use(bodyParser.json())
const PORT = process.env.PORT || 5500

dbConnect();

app.use("/uploads", express.static("./uploads"))
app.use("/", userRouter)
app.use("/posts", postRouter)

app.listen(PORT, () => {
    console.log("Server is running...")
})