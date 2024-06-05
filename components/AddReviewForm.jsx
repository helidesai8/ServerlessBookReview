// src/components/AddReviewForm.jsx
import React, { useState } from 'react';

const AddReviewForm = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://ncxdxvkfenqcu72gbeqdtdkrdi0odoox.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book_title: bookTitle, author: author, review_text: reviewText })
            });
            const contentType = response.headers.get('Content-Type');
            let responseData;
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
            console.log('Response status:', response.status);
            if (response.ok) {
                alert(responseData);
                setBookTitle('');
                setAuthor('');
                setReviewText('');
                location.reload();
            } else {
                console.error('Error adding review:', responseData);
                alert('Failed to add review');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Book Title:</label>
                <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required />
            </div>
            <div>
                <label>Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div>
                <label>Review Text:</label>
                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Add Review'}</button>
        </form>
    );
};

export default AddReviewForm;
