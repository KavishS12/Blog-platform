import React, { useState, useEffect } from 'react';
import { getPosts, createPost, deletePost } from '../services/posts';
import PostItem from './PostItem';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', author: '', content: '' });

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const data = await getPosts(page, 3, author);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        fetchPosts();
    }, [page, author]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleInputChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await createPost(newPost);
            setNewPost({ title: '', author: '', content: '' });
            setPage(1); // Go back to the first page after adding a new post
            const data = await getPosts(1, 3, author);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            const data = await getPosts(page, 3, author);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            {/* Add Post Form */}
            <form onSubmit={handleAddPost} className="add-post-form">
                <h2>Add a new blog</h2>
                <div className='form-input'>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newPost.title}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={newPost.author}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form-content'>
                    <textarea
                    name="content"
                    placeholder="Content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <button type="submit">Add Post</button>
            </form>

            {/* Filter by Author */}
            <input
                className='filter-author'
                type="text"
                placeholder="Filter by author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            {/* Post List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div>
                        {posts.map((post) => (
                            <PostItem
                                key={post._id}
                                post={post}
                                onDelete={() => handleDeletePost(post._id)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div>
                        <button
                            className='pageBtn'
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span> Page {page} of {totalPages} </span>
                        <button
                            className='pageBtn'
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostList;
