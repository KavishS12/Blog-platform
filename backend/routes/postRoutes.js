const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

//sample route for testing
// router.get('/',(req,res) => {
//     res.send('Welcome to the blog platform.');
// });

// POST : Create a new post
router.post('/',async(req,res) => {
    const {title,content,author} = req.body; // Extract data from the request body
    if(!title || !content || !author) {
        return res.status(400).json({message: 'All fields are required'});
    }
    try {
        const newPost = new Post({title,content,author});
        await newPost.save(); // Save the new post to the database
        res.status(201).json({message : 'Post created sucessfully', post : newPost});
    } 
    catch(err) {
        res.status(500).json({ message: 'Error creating post', error: err });
    }
})

// GET : Retrieve all posts
/*router.get('/',async(req,res) => {
    try{
        const posts = await Post.find(); // Fetch all posts from the database
        res.status(200).json(posts);// Respond with the posts
    } 
    catch(err) {
        res.status(500).json({message : "Error retrieving posts", error : error.message});
    }
})*/

// GET: Retrieve all posts with pagination (ensures that when the number of posts grows, the API can return manageable chunks instead of all posts at once)
// request sent to : http://localhost:5000/posts?page=1&limit=5 - similarly author param
// additional functionality to filter by author
router.get('/',async(req,res) => {
    try {
        const {page = 1,limit = 5, author} = req.query; // Default to page 1, 5 posts per page
        const skip = (page - 1) * limit; // Calculate the number of posts to skip
        let query = {};
        // Filter by author if the 'author' query param is provided
        if (author) {
            //query.author = author;
            query.author = { $regex: new RegExp(author, 'i') }; // 'i' for case-insensitive matching
        }
        const posts = await Post.find(query)
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(parseInt(limit));
        const total = await Post.countDocuments(); // Get total count of posts
        res.status(200).json({
            posts,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});

// GET: Retrieve a single post by ID
router.get('/:id',async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post); // Respond with the found post
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving post', error: error.message });
    }
});

// PUT: Update a post by ID
router.put('/:id',async(req,res) => {
    const { title, content, author } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, author }, // Fields to update
            { new: true, runValidators: true } // Return updated post and validate input
        );
        if(!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost}); // Respond with the updated post
    } 
    catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
});

// DELETE: Remove a post by ID
router.delete('/:id',async(req,res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});


module.exports = router;