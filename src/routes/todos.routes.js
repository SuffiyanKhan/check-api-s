import express from "express";
import todoCategory from "../controllers/todo.controller.js";
import checkAuth from "../middlewares/check-auth.middleware.js";

const route = express.Router();

route.post('/todoCategory', checkAuth, todoCategory)


export default route