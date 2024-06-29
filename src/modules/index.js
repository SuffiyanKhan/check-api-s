import mongoose from "mongoose";
import User from "./user.module.js";
import TokenModel from "./token.model.js";
import TodoModel from "./todo.model.js";
import TodoItemsModel from "./todoItems.model.js";


let db = {}

db.mongoose = mongoose;
db.user = User;
db.token = TokenModel
db.todoCategory = TodoModel
db.todoitemsmodel = TodoItemsModel


export default db



