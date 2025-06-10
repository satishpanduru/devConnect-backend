import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
},{timestamps: true});

export default mongoose.model('Post', postSchema);