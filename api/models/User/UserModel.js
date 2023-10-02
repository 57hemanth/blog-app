import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: (true, "Username is required"),
        unique: true
    },
    password: {
        type: String,
        required: (true, "Password is required")
    }
})

userSchema.pre("save", function() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

const User = mongoose.model("User", userSchema)

export default User
