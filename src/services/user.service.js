import db from '../modules/index.js'
const { user: User, token: Token } = db


const findByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        throw error
    }
}

const createUser = async (payload) => {
    try {
        const userModule = new User({ ...payload })
        const newUsersData = await userModule.save()
        return newUsersData
    } catch (error) {
        throw error
    }
}

const saveToken = async (payload) => {
    try {
        const newToken = new Token({ ...payload })
        const token = await newToken.save()
        return token
    } catch (error) {
        throw error
    }
}

const deleteTokensByUID = async (uid) => {
    try {
        const response = await Token.deleteOne({user: uid})
        // const response = await Token.deleteMany({user: uid})
        return response
    } catch (error) {
        throw error
    }
}
const UpdateUserByEmail = async (email) => {
    try {
        const response = await User.updateOne(
            { email: email },// filter,
            { isActive: true } // data to update
        )
        return response
    } catch (error) {
        throw error
    }
}
export {
    findByEmail,
    createUser,
    saveToken,
    deleteTokensByUID,
    UpdateUserByEmail
}