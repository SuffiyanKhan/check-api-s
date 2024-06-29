import jwt from 'jsonwebtoken';
import { UpdateUserByEmail, createUser, deleteTokensByUID, findByEmail, saveToken } from "../services/user.service.js"
import { compareHash, createHash } from "../utils/hah.utils.js"
import { serverConfig } from '../configs/server.config.js';

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await findByEmail(email)
        if (user) {
            return res.send("Email already exists")
        }
        const hashPassword = await createHash(password)
        const payload = {
            username,
            email,
            password: hashPassword
        }
        const saveUser = await createUser(payload)
        return res.status(200).send({ status: 200, message: "successfully", user: saveUser })

    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const saveUser = await findByEmail(email)
        if (!saveUser) return res.status(400).send("Invalid credential")

        const passwordMatch = await compareHash(password, saveUser.password)
        if (!passwordMatch) return res.status(500).json({ success: false, message: 'invalid creds', data: null })

        let token = jwt.sign({ email: saveUser.email, username: saveUser.username }, serverConfig.secretKey, { expiresIn: '15m' })
        let refreshToken = jwt.sign({ email: saveUser.email, username: saveUser.username }, serverConfig.secretKey, { expiresIn: '1d' })
        let accessToken = await saveToken({ token, user: saveUser.id })
        // let refreshToken = await saveToken({ token, user: saveUser.id })
        return res.status(200).send({ status: 200, message: "successfully", user: saveUser, token: accessToken, refreshToken: refreshToken })
    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message })

    }
}

const logout = async (req, res) => {
    try {
        const { uid } = req.body
        const logoutUser = await deleteTokensByUID(uid)
        if (logoutUser.deletedCount === 0) {
            return res.status(500).json({ success: false, message: 'already logged in', data: null })
        }

        return res.status(200).json({ success: true, message: 'succesfully logged out', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong', data: null })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await findByEmail(email)
        if (!user) return res.send('unprocessible request')

        if (user.otp !== otp) return res.send('invalid otp')

        const response = await UpdateUserByEmail(user.email)
        return res.send("otp verified")
    } catch (error) {
        return res.send("Something went wrong")
    }
}


export {
    signup,
    login,
    logout,
    verifyOtp
}
