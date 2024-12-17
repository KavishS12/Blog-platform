import React from 'react';
import './PostItem.css';

const PostItem = ({ post, onDelete }) => {
    return (
        <div className="post-item">
            <div className="author-info">
                <img
                    className="author-avatar"
                    src="https://via.placeholder.com/50"
                    alt={`${post.author}'s avatar`}
                />
                <div className="author-details">
                    <h2>{post.author}</h2>
                </div>
            </div>
            <p className="blog_title">{post.title}</p>
            <p>{post.content}</p>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default PostItem;
