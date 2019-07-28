import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String,
        required: true
    }
})

export default mongoose.model('users', UserSchema)
