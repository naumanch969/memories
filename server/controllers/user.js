import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userData.js"

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const isUserExist = await userModel.findOne({ email })

        if (isUserExist) return res.status(400).json({ message: "user with this email already exist" })
        if (password !== confirmPassword) return res.status(400).json({ message: "password and confirmPassword does not match" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await userModel.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword })
        const token = jwt.sign({ email: result.email, id: result._id }, "secret", { expiresIn: "12h" })

        res.status(200).json({ result, token })
    } catch (error) {
        console.log("error in signup-controllers", error)
        res.status(500).json({ message: "something went wrong" })
    }
}


export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!existingUser) return res.status(404).json({ message: "no user with this email" })
        if (!isPasswordCorrect) return res.status(400).json({ message: "incorrect password" })

        const token = jwt.sign({ email: existingUser.email, password, id: existingUser._id }, "secret", { expiresIn: "12h" })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        console.log("error in signIn-controllers", error)
        res.status(500).json({ message: "something went wrong" })
    }
}