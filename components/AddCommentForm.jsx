// src/components/AddCommentForm.jsx
import React, { useState } from 'react';

const AddCommentForm = () => {
    const [reviewId, setReviewId] = useState('');
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://x32haxzvf5g6erl7v2u6gkqyq40xefye.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review_id: reviewId, comment_text: commentText })
            });
            if (response.ok) {
                alert('Comment added successfully');
                location.reload();
            } else {
                const errorData = await response.text();
                console.error('Error adding comment:', errorData);
                alert('Failed to add comment');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Review ID:</label>
                <input type="text" value={reviewId} onChange={(e) => setReviewId(e.target.value)} required />
            </div>
            <div>
                <label>Comment:</label>
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} required />
            </div>
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default AddCommentForm;
