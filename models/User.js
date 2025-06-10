import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
        default: '',
    },
    location:{
        type: String,
        default: '',
    },
    skills:{
        type: [String],
        default: [],
    },
    githubUrl:{
        type: String,
        default: '',
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User; 