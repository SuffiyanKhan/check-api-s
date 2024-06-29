// import mongoose from "mongoose";

// const { Schema } = mongoose

// const TokenSchema = new Schema({
//     token: {
//         type: String,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     backTracking: {
//         type: String
//     }
// }, { timestamps: true })


// const TokenModel = mongoose.model('Token', TokenSchema)

// export default TokenModel






import mongoose from "mongoose";

const { Schema } = mongoose;

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Backtracking field me IP address aur device ka naam store karen
    backTracking: {
        ip: { type: String }, // IP address ko string me store karen
        device: { type: String } // Device ka naam ko string me store karen
    }
}, { timestamps: true });

const TokenModel = mongoose.model('Token', TokenSchema);

export default TokenModel;
