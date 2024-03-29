const UserSchema = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'})
}

const userLogin = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserSchema.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const userSignUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserSchema.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { userLogin, userSignUp }