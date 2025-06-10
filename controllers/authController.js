import User from "../models/User.js";
import Update from "../models/updatemodel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req,res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({name, email, password: hashedPassword});

        const token = jwt.sign({id: result._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(200).json({
            token,
            user:{
                _id: result._id,
                name: result.name,
                email: result.email,
            } });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({message: 'something went wrong'});
    }
};

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(400).json({message: 'User not found'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid password'});

        const token = jwt.sign({ id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const { password: _, ...userWithoutPassword} = existingUser._doc;

        res.status(200).json({token, user: userWithoutPassword});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "something went wrong"})
    }
};

export const updateProfile = async (req, res) => {
    try {
        console.log('Update profile route hit. User ID:', req.user.id);

        //const userId = req.body.id;
        const { name, bio, location, skills, githubUrl } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                bio,
                location,
                skills,
                githubUrl,
            },
            {new : true}
        );
        
        if(!updatedUser){
            return res.status(404).json({message: 'User not found'})
        }

        console.log('Updated user:', updatedUser);
        res.json(updatedUser);
    } catch (error) {
        console.error('profile update error:', error.message)
        res.status(500).json({message: 'server error while updating profile'})
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        // const userId = req.user.id;
        const user = await User.findById(req.user.id).select('-password');
        // const user = await User.findOne();

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        // const { password, ...userWithoutPassword } = user._doc;

        res.json(user);
    } catch (error) {
        console.error('Get current user error', error.message);
        res.status(500).json({message: 'server error'});
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('error fetching users:', error.message);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if(!user) return res.status(404).json({message: 'user not found'});

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message)
        res.status(500).json({message: 'server error'})
    }
};