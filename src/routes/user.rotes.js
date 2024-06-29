import express from 'express';
import tracking from './tracking.js'
import { login, logout, signup, verifyOtp } from '../controllers/user.controller.js';
const route = express.Router();

route.post('/signup', signup)
route.post('/login', login)
route.post('/logout', logout)
route.post('/verify-otp', verifyOtp)
route.post('/check', tracking)



export default route

