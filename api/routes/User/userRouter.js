import express from "express"
import { loginUser, logout, registerUser, userProfile } from "../../controllers/User/userCtrl.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile", userProfile)
userRouter.post("/logout", logout)

export default userRouter