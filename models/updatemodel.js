import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
    name:{
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
},{timestamps: true});

const Update = mongoose.model('Update', updateSchema);

export default Update;