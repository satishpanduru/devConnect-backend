import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        console.log("REQ.USER:", req.user)
        console.log('BODY:', req.body);

        if(!req.user || !req.body.content){
            return res.status(400).json({message: 'Invalid post data'})
        }

        const post = new Post({
            user: req.user.id,
            content: req.body.content,
        });

        const savedPost = await post.save()
        await savedPost.populate('user', 'name');

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Create post error:', error.message);
        res.status(500).json({message: 'failed to create post'})
    }
};

export const getPosts = async (req, res) => {
    try {
        // console.log("Getting posts for user:", req.user?.id);
        const posts = await Post.find()
        .sort({createdAt: -1})
        .populate('user', 'name')

        res.status(200).json(posts);
    } catch (error) {
        console.error('Get posts error:', error.message);
        res.status(500).json({message: 'Failed to ge posts'});
    }
};

export const toggleLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: 'post not found'});

        const userId = req.user.id;

        const hasLiked = post.likes.includes(userId);

        if(hasLiked){
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        }
        else{
            post.likes.push(userId);
        }

        await post.save();
        await post.populate('user', 'name');

        res.status(200).json(post);
    } catch (error) {
        console.error('Toggle like error:', error.message);
        res.status(500).json({message: 'Failed to toggle like'});
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: 'post not found'});

        if(!post.likes.includes(req.user.id)){
            post.likes.push(req.user.id);
            await post.save();
        }

        await post.populate('user', 'name');
        res.status(200).json(post);
    } catch (error) {
        console.error('Like post erroe:', error.message);
        res.status(500).json({message: 'Failed to like post'});
    }
};

export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: 'Post not found'});

        post.likes = post.likes.filter((userId) => userId.toString() !== req.user.id);
        await post.save();

        await post.populate('user', 'name');
        res.status(200).json(post);
    } catch (error) {
        console.error('Unlike post error:', error.message);
        res.status(500).json({message: 'Failed to unlike post'});
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(403).json({message: 'Post not found'});

        if(post.user.toString() !== req.user.id){
            return res.status(403).json({message: 'Not authorized'});
        }

        await post.deleteOne();
        res.json({message: 'post deleted successfully'})
    } catch (error) {
        console.error('Delete error:', error.message);
        res.status(500).json({message: 'server error'})
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({message: 'Post not found'});

        if(post.user.toString() !== req.user.id){
            return res.status(403).json({message: 'not authorized'});
        }

        post.content = req.body.content || post.content;
        await post.save();

        const updatedPost = await Post.findById(post._id).populate('user', 'name _id');

        res.json(updatedPost);
    } catch (error) {
        console.error('update error', error.message)
        res.status(500).json({message: 'server erroe'})
    }
};

