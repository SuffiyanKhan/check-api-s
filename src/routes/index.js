import express from 'express';
import { login, logout, signup, verifyOtp } from '../controllers/user.controller.js';
import { signupRouteValidator } from '../validators/request.validator.js';
import checkAuth from '../middlewares/check-auth.middleware.js';
import rToken from '../controllers/refresh.controller.js';

const route = express.Router();


route.post("/signup", signupRouteValidator, signup)
route.post('/login', login)
route.post('/logout', logout)
route.post('/verify-otp', verifyOtp)
route.post('/refresh-token', rToken)

export default route