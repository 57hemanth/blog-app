import User from "../../models/User/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).send({ user })
    } catch(err) {
        res.status(400).send({ message: err.message })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if(user != null) {
            const compare = await bcrypt.compare(password, user.password)
            if(compare){
                const token = await jwt.sign({ username, id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
                res.cookie("token", token)
                res.status(200).send({ message: "Cookie set", data: { username, id: user._id }})
            } else {
                res.status(400).send({ message: "Credentials incorrect" })
            }
        } else {
            res.status(400).send({ message: "User not found" })
        }
    } catch(err) {
        res.status(400).send({ message: err.message })
    }
}

const userProfile = async (req, res) => {
    const { token } = req.cookies
    if(token === undefined){
        res.send({message: "Ok"})
    } else {
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        res.send({ username: user.username, id: user.id })
    }
}

const logout = async (req, res) => {
    res.clearCookie("token").send({ message: "Cleared cookies" })
}

export { registerUser, loginUser, userProfile, logout }