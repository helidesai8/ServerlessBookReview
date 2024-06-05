// src/components/RatingForm.jsx
import React, { useState } from 'react';

const RatingForm = () => {
    const [reviewId, setReviewId] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://fqad5hwsldbouuvkbrr2x5jwtq0metrg.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review_id: reviewId, rating: rating })
        });
        if (response.ok) {
            alert('Rating updated successfully');
        } else {
            alert('Failed to update rating');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Review ID:</label>
                <input type="text" value={reviewId} onChange={(e) => setReviewId(e.target.value)} required />
            </div>
            <div>
                <label>Rating:</label>
                <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
            </div>
            <button type="submit">Rate Review</button>
        </form>
    );
};

export default RatingForm;
