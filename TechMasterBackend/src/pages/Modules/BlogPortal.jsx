import React, { useState, useEffect } from 'react';
import * as blogServices from '../../Services/blogServices.js';

export default function BlogPortal() {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '', coverImage: '' });

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        const res = await blogServices.getBlogs();
        if (res.success) {
            setBlogs(res.data);
        }
    };

    const handleCreate = async () => {
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        
        const res = await blogServices.createBlog(data);
        if (res.success) {
            loadBlogs();
        }
    };

    const simulateMediaUpload = (key) => {
        // Dummy upload simulation logic
        const dummyUrl = `https://example.com/media/${Date.now()}.jpg`;
        const onSelect = (url) => {
            setFormData(prev => ({ ...prev, [key]: url }));
        };
        onSelect(dummyUrl);
    };

    return (
        <div>
            <h1>Blog Portal</h1>
            <div className="form">
                <input 
                    value={formData.title} 
                    onChange={e => setFormData(prev => ({...prev, title: e.target.value}))} 
                    placeholder="Title" 
                />
                <textarea 
                    value={formData.content} 
                    onChange={e => setFormData(prev => ({...prev, content: e.target.value}))} 
                    placeholder="Content" 
                />
                <button onClick={() => simulateMediaUpload('coverImage')}>Upload Cover Image</button>
                <button onClick={handleCreate}>Create Blog</button>
            </div>
            <div className="list">
                {blogs.map(blog => (
                    <div key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
