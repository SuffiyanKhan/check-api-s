import mongoose from "mongoose";

const { Schema } = mongoose

const TodoSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'USer'
    }
},{timestamps : true})

const TodoModel = mongoose.model('todo', TodoSchema)

export default TodoModel