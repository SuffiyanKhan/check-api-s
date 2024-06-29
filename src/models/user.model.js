import mongoose from "mongoose";
import sendEmail from "../services/mail.service.js";
import generateOtp from "../utils/generateOpt.js";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        typeof: String,
        required: true
    },
    email: {
        typeof: String,
        required: true
    },
    password: {
        typeof: String,
        required: true
    },
    otp: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


UserSchema.pre('save', function (next) {
    if (!this.otp) {
        this.otp = generateOtp()
        sendEmail({
            to: this.email,
            subject: 'Your otp',
            text: `Your otp is ${this.otp}`
        }).then(res => console.log(`Success sending email to ${this.email}`))
            .catch(err => console.log(`Error sending email to ${this.email}`))
    }
    next()
})


const UserModel = mongoose.model('User', UserSchema)


export default UserModel







