import axios from 'axios';

const API_URL = 'http://localhost:5000/posts'; // Backend API URL

export const getPosts = async (page = 1, limit = 5, author = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                page,
                limit,
                author
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], total: 0, totalPages: 0 };
    }
};

export const createPost = async (postData) => {
    const response = await axios.post(API_URL, postData);
    return response.data;
};

export const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
